from flask import Flask, request, session
from flask_cors import CORS
from models import db, Order, OrderItem
from dotenv import load_dotenv
from werkzeug.security import check_password_hash
import os
import random


load_dotenv()

app = Flask(__name__)

# Session configuration
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False

CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173", "http://127.0.0.1:5173"],
)


# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# Create database tables
with app.app_context():
    db.create_all()


# =========================
# ADMIN AUTHENTICATION
# =========================

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    # Check credentials from .env
    if (
    username == os.getenv("ADMIN_USERNAME")
    and check_password_hash(
        os.getenv("ADMIN_PASSWORD_HASH"),
        password,
    )
):
        session["admin_logged_in"] = True

        return {
            "success": True,
            "message": "Login successful."
        }

    return {
        "success": False,
        "message": "Invalid username or password."
    }, 401


@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():
    session.pop("admin_logged_in", None)

    return {
        "success": True,
        "message": "Logged out successfully."
    }


@app.route("/api/admin/check", methods=["GET"])
def admin_check():
    if session.get("admin_logged_in"):
        return {
            "success": True,
            "authenticated": True
        }

    return {
        "success": True,
        "authenticated": False
    }


# =========================
# GET ORDERS
# =========================

@app.route("/api/orders", methods=["GET"])
def get_orders():

    # Check if admin is logged in
    if not session.get("admin_logged_in"):
        return {
            "success": False,
            "message": "Unauthorized. Admin login required."
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

    order_number = f"SMK-{random.randint(100000, 999999)}"

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