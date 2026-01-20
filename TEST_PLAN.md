# Test Plan: Padel Court Reservation System

## 1. Project Setup
- [ ] **Backend Start**: Ensure Spring Boot application runs successfully on port 8080.
- [ ] **Frontend Start**: Ensure Angular application runs successfully on `http://localhost:4200`.

## 2. Authentication (Auth)
### 2.1 Registration
- [ ] **Scenario**: Register a new user (Adherent).
  - **Action**: `POST /api/auth/register` (or via UI Register Page).
  - **Data**: First Name, Last Name, Email, Password, Role (USER).
  - **Expected**: HTTP 200 OK, User created.

### 2.2 Login
- [ ] **Scenario**: Login with valid Adherent credentials.
  - **Action**: `POST /api/auth/authenticate` (or via UI Login Page).
  - **Expected**: HTTP 200 OK, JWT Token received.
- [ ] **Scenario**: Login with valid Admin credentials.
  - **Action**: Login as `admin@padel.com` / `admin123`.
  - **Expected**: HTTP 200 OK, Redirect to Admin Dashboard.
- [ ] **Scenario**: Login with invalid credentials.
  - **Expected**: HTTP 403/401, Error message displayed.

## 3. Terrain Management (Admin Only)
- [ ] **Scenario**: Create a Terrain.
  - **Action**: Admin creates "Court 1" (Type: Indoor/Outdoor).
  - **Expected**: Terrain appears in the list.
- [ ] **Scenario**: Update a Terrain.
  - **Action**: Modify name or description.
  - **Expected**: Changes reflected.
- [ ] **Scenario**: Delete a Terrain.
  - **Action**: Remove a terrain.
  - **Expected**: Terrain removed from list.

## 4. Time Slot (Creneau) Management (Admin Only)
- [ ] **Scenario**: Add Availability.
  - **Action**: Admin defines available slots (e.g., 10:00-11:00) for "Court 1".
  - **Expected**: Slot is saved and visible.
- [ ] **Scenario**: Delete Availability.
  - **Action**: Remove a specific time slot.
  - **Expected**: Slot no longer available for booking.

## 5. Reservation System (Adherent)
- [ ] **Scenario**: View Available Courts.
  - **Action**: Browse "Book a Court" page.
  - **Expected**: List of terrains displayed.
- [ ] **Scenario**: View Available Slots.
  - **Action**: Select a terrain.
  - **Expected**: List of available time slots displayed.
- [ ] **Scenario**: Make a Reservation.
  - **Action**: Select a slot and confirm booking.
  - **Expected**: Reservation confirmed, visible in "My Reservations".
- [ ] **Scenario**: Cancel Reservation.
  - **Action**: User cancels their own booking.
  - **Expected**: Slot becomes available again for others.

## 6. Reservation Management (Admin)
- [ ] **Scenario**: View All Reservations.
  - **Action**: Admin checks the schedule.
  - **Expected**: Full list of bookings visible.
- [ ] **Scenario**: Update Reservation Status.
  - **Action**: Mark as CONFIRMED or CANCELLED manually.
  - **Expected**: Status updated.
