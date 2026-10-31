# Database Design

## 1. User

- `name`: String, required, 3–20 characters, trimmed
- `email`: String, required, unique, lowercase, trimmed
- `password`: String, required for system provider, minimum 6 characters
- `provider`: String, enum (`system`, `google`), default `system`
- `dob`: Date
- `profilePic`: String
- `isVerified`: Boolean, default `false`
- `isDeleted`: Boolean, default `false`
- `createdAt`: Date, automatic
- `updatedAt`: Date, automatic

## 2. OTP

- `email`: String, required, trimmed
- `code`: String, required, 6 characters
- `expiresAt`: Date, required, TTL index
- `createdAt`: Date, automatic
- `updatedAt`: Date, automatic

## 3. Message

- `content`: String, required, 1–200 characters, trimmed
- `sender`: ObjectId, reference to `User`, optional
- `receiver`: ObjectId, reference to `User`, required
- `isDeleted`: Boolean, default `false`
- `createdAt`: Date, automatic
- `updatedAt`: Date, automatic

## Notes

- `createdAt` and `updatedAt` are managed by Mongoose timestamps.
- `isDeleted` supports soft deletion.
- OTP documents expire according to `expiresAt`.
- `sender` and `receiver` reference the `User` model.