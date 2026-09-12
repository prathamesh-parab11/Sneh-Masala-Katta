from flask import Flask, request
from flask_cors import CORS
from models import db, Order, OrderItem
from dotenv import load_dotenv
from werkzeug.security import check_password_hash
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
import os
import random


load_dotenv()

app = Flask(__name__)

# =========================
# APP CONFIGURATION
# =========================

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sneh-masala-katta.onrender.com",
    ],
)


# =========================
# DATABASE CONFIGURATION
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# =========================
# CREATE DATABASE TABLES
# =========================

with app.app_context():
    db.create_all()


# =========================
# ADMIN AUTHENTICATION
# =========================

def create_admin_token():
    serializer = URLSafeTimedSerializer(
        app.config["SECRET_KEY"]
    )

    return serializer.dumps(
        {
            "admin": True
        },
        salt="admin-auth",
    )


def verify_admin_token(token):
    if not token:
        return False

    serializer = URLSafeTimedSerializer(
        app.config["SECRET_KEY"]
    )

    try:
        data = serializer.loads(
            token,
            salt="admin-auth",
            max_age=86400,
        )

        return data.get("admin") is True

    except (BadSignature, SignatureExpired):
        return False


def is_admin_authenticated():

    authorization = request.headers.get(
        "Authorization",
        "",
    )

    if not authorization.startswith("Bearer "):
        return False

    token = authorization.replace(
        "Bearer ",
        "",
        1,
    ).strip()

    return verify_admin_token(token)


# =========================
# ADMIN LOGIN
# =========================

@app.route("/api/admin/login", methods=["POST"])
def admin_login():

    data = request.get_json() or {}

    username = data.get("username")
    password = data.get("password")

    if (
        username == os.getenv("ADMIN_USERNAME")
        and check_password_hash(
            os.getenv("ADMIN_PASSWORD_HASH"),
            password,
        )
    ):

        token = create_admin_token()

        return {
            "success": True,
            "message": "Login successful.",
            "token": token,
        }

    return {
        "success": False,
        "message": "Invalid username or password.",
    }, 401


# =========================
# ADMIN LOGOUT
# =========================

@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():

    return {
        "success": True,
        "message": "Logged out successfully.",
    }


# =========================
# CHECK ADMIN LOGIN
# =========================

@app.route("/api/admin/check", methods=["GET"])
def admin_check():

    if is_admin_authenticated():

        return {
            "success": True,
            "authenticated": True,
        }

    return {
        "success": True,
        "authenticated": False,
    }


# =========================
# GET ORDERS
# =========================

@app.route("/api/orders", methods=["GET"])
def get_orders():

    if not is_admin_authenticated():

        return {
            "success": False,
            "message": "Unauthorized. Admin login required.",
        }, 401

    orders = Order.query.order_by(
        Order.created_at.desc()
    ).all()

    result = []

    for order in orders:

        result.append({
            "id": order.id,
            "orderNumber": order.order_number,
            "name": order.name,
            "phone": order.phone,
            "address": order.address,
            "city": order.city,
            "pincode": order.pincode,
            "total": order.total,
            "createdAt": order.created_at.isoformat(),

            "items": [
                {
                    "id": item.id,
                    "productId": item.product_id,
                    "name": item.product_name,
                    "price": item.price,
                    "quantity": item.quantity,
                    "subtotal": item.subtotal,
                }

                for item in order.items
            ],
        })

    return {
        "success": True,
        "orders": result,
    }


# =========================
# EDIT ORDER
# =========================

@app.route("/api/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):

    if not is_admin_authenticated():

        return {
            "success": False,
            "message": "Unauthorized. Admin login required.",
        }, 401

    order = db.session.get(
        Order,
        order_id,
    )

    if not order:

        return {
            "success": False,
            "message": "Order not found.",
        }, 404

    data = request.get_json() or {}

    # Customer information

    order.name = data.get(
        "name",
        order.name,
    )

    order.phone = data.get(
        "phone",
        order.phone,
    )

    order.address = data.get(
        "address",
        order.address,
    )

    order.city = data.get(
        "city",
        order.city,
    )

    order.pincode = data.get(
        "pincode",
        order.pincode,
    )

    # Item quantities

    items_data = data.get(
        "items",
        [],
    )

    for item_data in items_data:

        item = db.session.get(
            OrderItem,
            item_data.get("id"),
        )

        if item and item.order_id == order.id:

            quantity = item_data.get(
                "quantity"
            )

            try:

                quantity = int(quantity)

            except (TypeError, ValueError):

                return {
                    "success": False,
                    "message": "Invalid quantity.",
                }, 400

            if quantity < 1:

                return {
                    "success": False,
                    "message": "Quantity must be at least 1.",
                }, 400

            item.quantity = quantity

            item.subtotal = (
                item.price * item.quantity
            )

    # Recalculate total

    order.total = sum(
        item.subtotal
        for item in order.items
    )

    db.session.commit()

    return {
        "success": True,
        "message": "Order updated successfully.",

        "order": {
            "id": order.id,
            "orderNumber": order.order_number,
            "name": order.name,
            "phone": order.phone,
            "address": order.address,
            "city": order.city,
            "pincode": order.pincode,
            "total": order.total,
            "createdAt": order.created_at.isoformat(),

            "items": [
                {
                    "id": item.id,
                    "productId": item.product_id,
                    "name": item.product_name,
                    "price": item.price,
                    "quantity": item.quantity,
                    "subtotal": item.subtotal,
                }

                for item in order.items
            ],
        },
    }


# =========================
# DELETE ORDER
# =========================

@app.route("/api/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):

    if not is_admin_authenticated():

        return {
            "success": False,
            "message": "Unauthorized. Admin login required.",
        }, 401

    order = db.session.get(
        Order,
        order_id,
    )

    if not order:

        return {
            "success": False,
            "message": "Order not found.",
        }, 404

    db.session.delete(order)

    db.session.commit()

    return {
        "success": True,
        "message": "Order deleted successfully.",
    }


# =========================
# HOME
# =========================

@app.route("/")
def home():

    return {
        "message": "Sneh Masala Katta backend is running!"
    }


# =========================
# CREATE ORDER
# =========================

@app.route("/api/orders", methods=["POST"])
def create_order():

    data = request.get_json()

    print("New order received:")
    print(data)

    order_number = (
        f"SMK-{random.randint(100000, 999999)}"
    )

    order = Order(
        order_number=order_number,
        name=data["name"],
        phone=data["phone"],
        address=data["address"],
        city=data["city"],
        pincode=data["pincode"],
        total=data["total"],
    )

    db.session.add(order)

    db.session.flush()

    for item in data["items"]:

        order_item = OrderItem(
            order_id=order.id,
            product_id=item["id"],
            product_name=item["name"],
            price=item["price"],
            quantity=item["quantity"],
            subtotal=item["price"] * item["quantity"],
        )

        db.session.add(order_item)

    db.session.commit()

    return {
        "success": True,
        "message": "Order saved successfully!",
        "orderNumber": order_number,
    }, 201


# =========================
# START SERVER
# =========================

if __name__ == "__main__":
    app.run(debug=True)