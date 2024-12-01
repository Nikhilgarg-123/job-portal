This is a job portal API where users can register, login, update profiles, post jobs, and manage companies. This API is intended for job seekers, recruiters, and administrators. Below is the documentation for the available endpoints.

## Table of Contents
- [Register User](#register-user)
- [Login User](#login-user)
- [Update Profile](#update-profile)
- [Logout](#logout)
- [Register Company](#register-company)
- [Get Companies](#get-companies)
- [Get Company by ID](#get-company-by-id)
- [Update Company](#update-company)
- [Post Job](#post-job)

## Register User
**Endpoint**: `/user/register`  
**Method**: `POST`  
**Request Body**:
```
{
    "name": "John Doe",
    "email": "xyx@example.com",
    "phone": "1234567890",
    "password": "123",
    "role": "jobseeker"
}
```