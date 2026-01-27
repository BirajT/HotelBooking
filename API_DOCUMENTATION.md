# Hotel Booking API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most endpoints require JWT authentication via cookies. Include the `access_token` cookie in requests.

---

## Auth Endpoints

### 1. Register User
**POST** `/auth/register`

**Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "gender": "MALE"
}
```

**Response:**
```json
{
  "message": "Account Created Successfully",
  "status": "success",
  "data": { user object without password }
}
```

---

### 2. Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login Success",
  "status": "success",
  "data": { user object without password },
  "access_token": "jwt_token"
}
```

---

### 3. Logout
**POST** `/auth/logout`

**Auth Required:** Yes

**Response:**
```json
{
  "message": "Logged out successfully!!",
  "status": "success",
  "data": null
}
```

---

### 4. Update Password
**PUT** `/auth/:id`

**Auth Required:** Yes

**Body:**
```json
{
  "email": "john@example.com",
  "oldpassword": "password123",
  "newpassword": "newpassword456"
}
```

**Response:**
```json
{
  "message": "password updated",
  "status": "success",
  "data": { user object without password }
}
```

---

### 5. Forgot Password
**POST** `/auth/forgotPassword`

**Body:**
```json
{
  "email": "john@example.com",
  "newpassword": "newpassword456"
}
```

**Response:**
```json
{
  "message": "Password reset successful",
  "status": "success",
  "data": null
}
```

---

## Hotel Endpoints

### 1. Get All Hotels
**GET** `/hotel/getAll`

**Query Parameters:**
- `query` - Search by name or address
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

**Response:**
```json
{
  "message": "Hotel fetched",
  "status": "success",
  "data": [hotels array],
  "pagination": {
    "total_counts": 100,
    "current_page": 1,
    "per_page_limit": 10,
    "total_pages": 10
  }
}
```

---

### 2. Get Hotel by ID
**GET** `/hotel/:id`

**Response:**
```json
{
  "message": "hotel fetched",
  "status": "success",
  "data": { hotel object }
}
```

---

### 3. Create Hotel
**POST** `/hotel/create`

**Auth Required:** Yes (ADMIN only)

**Content-Type:** `multipart/form-data`

**Body:**
```
name: "Grand Hotel"
location: "New York"
rooms: 50
phone: "1234567890"
hotel_images: [file upload]
```

**Response:**
```json
{
  "message": "hotel fetched",
  "status": "success",
  "data": { hotel object }
}
```

---

### 4. Update Hotel
**PUT** `/hotel/update/:id`

**Auth Required:** Yes (ADMIN only)

**Content-Type:** `multipart/form-data`

**Body:** (all fields optional)
```
name: "Updated Hotel Name"
location: "Updated Location"
rooms: 60
phone: "9876543210"
hotel_images: [file upload]
```

**Response:**
```json
{
  "message": "hotel updated",
  "status": "success",
  "data": { hotel object }
}
```

---

### 5. Delete Hotel
**DELETE** `/hotel/remove/:id`

**Auth Required:** Yes (ADMIN only)

**Response:**
```json
{
  "message": "Hotel deleted",
  "status": "success",
  "data": null
}
```

---

## Booking Endpoints

### 1. Get All Bookings
**GET** `/booking/getAll`

**Auth Required:** Yes (ADMIN only)

**Response:**
```json
{
  "message": "Booking fetched",
  "status": "success",
  "data": [bookings array with populated hotel and user]
}
```

---

### 2. Get Booking by ID
**GET** `/booking/:id`

**Auth Required:** Yes (USER or ADMIN)

**Response:**
```json
{
  "message": "Booking fetched",
  "status": "success",
  "data": { booking object with populated hotel and user }
}
```

---

### 3. Create Booking
**POST** `/booking/create`

**Auth Required:** Yes (USER or ADMIN)

**Body:**
```json
{
  "hotel": "hotel_id",
  "room": "room_id",
  "check_in": "2026-02-01",
  "check_out": "2026-02-05"
}
```

**Response:**
```json
{
  "message": "hotel booked",
  "status": "success",
  "data": { booking object }
}
```

---

### 4. Update Booking
**PUT** `/booking/:id`

**Auth Required:** Yes (USER or ADMIN)

**Body:**
```json
{
  "check_in": "2026-02-02",
  "check_out": "2026-02-06"
}
```

**Response:**
```json
{
  "message": "Booking updated successfully",
  "status": "success",
  "data": { booking object }
}
```

---

### 5. Delete Booking
**DELETE** `/booking/:id`

**Auth Required:** Yes (USER or ADMIN)

**Response:**
```json
{
  "message": "Booking removed successfully",
  "status": "success"
}
```

---

## Error Response Format

All errors follow this format:
```json
{
  "message": "Error message",
  "status": "fail" or "error",
  "success": false,
  "data": null,
  "originalError": "stack trace (development only)"
}
```

---

## User Roles
- `USER` - Regular user (can create/view/update/delete own bookings)
- `ADMIN` - Administrator (can manage hotels and view all bookings)

## Booking Status
- `Pending` - Booking is pending confirmation
- `Confirm` - Booking is confirmed
- `Canceled` - Booking is canceled

## Room Types
- `SINGLE` - Single room
- `DOUBLE` - Double room
- `DELUXE` - Deluxe room
- `SUITE` - Suite room
