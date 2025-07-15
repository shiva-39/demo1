#  Schedula Doctor Appointment Booking System – API Design

##  Auth APIs

| Section              | What to Document                                                         |
| -------------------- | ------------------------------------------------------------------------ |
| **API Name**         | User Signup                                                              |
| **HTTP Method**      | POST                                                                     |
| **Endpoint**         | /auth/signup                                                             |
| **Request Body**     | { "email": "string", "password": "string", "role": "doctor \| patient" } |
| **Headers**          | None                                                                     |
| **Response (200)**   | { "message": "Signup successful", "userId": "uuid" }                     |
| **Error Cases**      | 400 (Validation error), 409 (Email exists)                               |
| **Auth Required?**   | No                                                                       |
| **Validation Notes** | Valid email format, password min 6 chars                                 |



| Section              | What to Document                            |
| -------------------- | ------------------------------------------- |
| **API Name**         | User Login                                  |
| **HTTP Method**      | POST                                        |
| **Endpoint**         | /auth/login                                 |
| **Request Body**     | { "email": "string", "password": "string" } |
| **Headers**          | None                                        |
| **Response (200)**   | { "accessToken": "jwt-token" }              |
| **Error Cases**      | 401 (Invalid credentials)                   |
| **Auth Required?**   | No                                          |
| **Validation Notes** | Valid email format                          |



| Section              | What to Document                   |
| -------------------- | ---------------------------------- |
| **API Name**         | User Logout                        |
| **HTTP Method**      | POST                               |
| **Endpoint**         | /auth/logout                       |
| **Request Body**     | None                               |
| **Headers**          | Authorization: Bearer token        |
| **Response (200)**   | { "message": "Logout successful" } |
| **Error Cases**      | 401 (Invalid or expired token)     |
| **Auth Required?**   | Yes                                |
| **Validation Notes** | Must pass valid JWT token          |

---

##  Doctor APIs

| Section              | What to Document                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **API Name**         | Create Doctor Profile                                                                            |
| **HTTP Method**      | POST                                                                                             |
| **Endpoint**         | /doctors                                                                                         |
| **Request Body**     | { "userId": "string", "name": "string", "specialization": "string", "yearsExperience": integer } |
| **Headers**          | Authorization: Bearer token                                                                      |
| **Response (200)**   | { "message": "Doctor profile created" }                                                          |
| **Error Cases**      | 400 (Validation error), 401 (Unauthorized)                                                       |
| **Auth Required?**   | Yes                                                                                              |
| **Validation Notes** | All fields required, yearsExperience ≥ 0                                                         |



| Section              | What to Document                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **API Name**         | Get Doctor Profile                                                                                               |
| **HTTP Method**      | GET                                                                                                              |
| **Endpoint**         | /doctors/{id}                                                                                                    |
| **Request Body**     | None                                                                                                             |
| **Headers**          | Authorization: Bearer token                                                                                      |
| **Response (200)**   | { "id": "string", "userId": "string", "name": "string", "specialization": "string", "yearsExperience": integer } |
| **Error Cases**      | 404 (Doctor not found), 401 (Unauthorized)                                                                       |
| **Auth Required?**   | Yes                                                                                                              |
| **Validation Notes** | ID must be valid UUID                                                                                            |

---

##  Patient APIs

| Section              | What to Document                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| **API Name**         | Create Patient Profile                                                                                |
| **HTTP Method**      | POST                                                                                                  |
| **Endpoint**         | /patients                                                                                             |
| **Request Body**     | { "userId": "string", "name": "string", "age": integer, "gender": "string", "phoneNumber": "string" } |
| **Headers**          | Authorization: Bearer token                                                                           |
| **Response (200)**   | { "message": "Patient profile created" }                                                              |
| **Error Cases**      | 400 (Validation error), 401 (Unauthorized)                                                            |
| **Auth Required?**   | Yes                                                                                                   |
| **Validation Notes** | Age ≥ 0, valid phone number format                                                                    |



| Section              | What to Document                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **API Name**         | Get Patient Profile                                                                                                   |
| **HTTP Method**      | GET                                                                                                                   |
| **Endpoint**         | /patients/{id}                                                                                                        |
| **Request Body**     | None                                                                                                                  |
| **Headers**          | Authorization: Bearer token                                                                                           |
| **Response (200)**   | { "id": "string", "userId": "string", "name": "string", "age": integer, "gender": "string", "phoneNumber": "string" } |
| **Error Cases**      | 404 (Not found), 401 (Unauthorized)                                                                                   |
| **Auth Required?**   | Yes                                                                                                                   |
| **Validation Notes** | ID must be valid UUID                                                                                                 |

---

##  Doctor Availability APIs

| Section              | What to Document                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **API Name**         | Create Availability Slot                                                                   |
| **HTTP Method**      | POST                                                                                       |
| **Endpoint**         | /availability                                                                              |
| **Request Body**     | { "doctorId": "string", "dayOfWeek": integer, "startTime": "HH\:mm", "endTime": "HH\:mm" } |
| **Headers**          | Authorization: Bearer token                                                                |
| **Response (200)**   | { "message": "Availability slot created" }                                                 |
| **Error Cases**      | 400 (Validation error), 401 (Unauthorized)                                                 |
| **Auth Required?**   | Yes                                                                                        |
| **Validation Notes** | dayOfWeek 0–6, start < end time                                                            |



| Section              | What to Document                                      |
| -------------------- | ----------------------------------------------------- |
| **API Name**         | Get Availability Slots                                |
| **HTTP Method**      | GET                                                   |
| **Endpoint**         | /availability?doctorId={id}                           |
| **Request Body**     | None                                                  |
| **Headers**          | Authorization: Bearer token                           |
| **Response (200)**   | Array of slots with id, dayOfWeek, startTime, endTime |
| **Error Cases**      | 404 (Not found), 401 (Unauthorized)                   |
| **Auth Required?**   | Yes                                                   |
| **Validation Notes** | doctorId must be valid UUID                           |

---

##  Appointments APIs

| Section              | What to Document                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **API Name**         | Book Appointment                                                                                         |
| **HTTP Method**      | POST                                                                                                     |
| **Endpoint**         | /appointments                                                                                            |
| **Request Body**     | { "patientId": "string", "doctorId": "string", "date": "YYYY-MM-DD", "day": "string", "time": "HH\:mm" } |
| **Headers**          | Authorization: Bearer token                                                                              |
| **Response (200)**   | { "message": "Appointment booked" }                                                                      |
| **Error Cases**      | 400 (Validation), 401 (Unauthorized)                                                                     |
| **Auth Required?**   | Yes                                                                                                      |
| **Validation Notes** | Valid date/time format, existing doctor and patient IDs                                                  |



| Section              | What to Document                    |
| -------------------- | ----------------------------------- |
| **API Name**         | Get Appointment Details             |
| **HTTP Method**      | GET                                 |
| **Endpoint**         | /appointments/{id}                  |
| **Request Body**     | None                                |
| **Headers**          | Authorization: Bearer token         |
| **Response (200)**   | Appointment details object          |
| **Error Cases**      | 404 (Not found), 401 (Unauthorized) |
| **Auth Required?**   | Yes                                 |
| **Validation Notes** | ID must be valid UUID               |

---

##  Rescheduling APIs

| Section              | What to Document                                                            |
| -------------------- | --------------------------------------------------------------------------- |
| **API Name**         | Reschedule Appointment                                                      |
| **HTTP Method**      | POST                                                                        |
| **Endpoint**         | /reschedules                                                                |
| **Request Body**     | { "appointmentId": "string", "newDate": "YYYY-MM-DD", "newTime": "HH\:mm" } |
| **Headers**          | Authorization: Bearer token                                                 |
| **Response (200)**   | { "message": "Appointment rescheduled" }                                    |
| **Error Cases**      | 400 (Validation), 404 (Appointment not found), 401 (Unauthorized)           |
| **Auth Required?**   | Yes                                                                         |
| **Validation Notes** | newDate in future, valid time format                                        |

---

##  Dashboards / Analytics APIs

###  Admin Dashboard – Summary Stats

| Section              | What to Document                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **API Name**         | Get System Summary Stats                                                                   |
| **HTTP Method**      | GET                                                                                        |
| **Endpoint**         | /admin/dashboard                                                                           |
| **Request Body**     | None                                                                                       |
| **Headers**          | Authorization: Bearer token                                                                |
| **Response (200)**   | { "totalUsers": int, "totalDoctors": int, "totalPatients": int, "totalAppointments": int } |
| **Error Cases**      | 401 (Unauthorized), 403 (Forbidden)                                                        |
| **Auth Required?**   | Yes (Admin only)                                                                           |
| **Validation Notes** | User role must be admin                                                                    |

---

###  Doctor Dashboard – Own Appointments

| Section              | What to Document                                               |
| -------------------- | -------------------------------------------------------------- |
| **API Name**         | Get Doctor's Appointments Summary                              |
| **HTTP Method**      | GET                                                            |
| **Endpoint**         | /doctors/{id}/appointments                                     |
| **Request Body**     | None                                                           |
| **Headers**          | Authorization: Bearer token                                    |
| **Response (200)**   | Array of appointments with patient details, date, time, status |
| **Error Cases**      | 401 (Unauthorized), 403 (Forbidden)                            |
| **Auth Required?**   | Yes (Doctor only)                                              |
| **Validation Notes** | Doctor ID must be valid UUID                                   |

---

###  Patient Dashboard – Own Appointments

| Section              | What to Document                                              |
| -------------------- | ------------------------------------------------------------- |
| **API Name**         | Get Patient's Appointments History                            |
| **HTTP Method**      | GET                                                           |
| **Endpoint**         | /patients/{id}/appointments                                   |
| **Request Body**     | None                                                          |
| **Headers**          | Authorization: Bearer token                                   |
| **Response (200)**   | Array of appointments with doctor details, date, time, status |
| **Error Cases**      | 401 (Unauthorized), 403 (Forbidden)                           |
| **Auth Required?**   | Yes (Patient only)                                            |
| **Validation Notes** | Patient ID must be valid UUID                                 |

---


