# Cloud Resume Challenge — Saddam Majid

A production-grade, serverless resume website built entirely on AWS as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

This project demonstrates real, hands-on cloud engineering skills — from frontend hosting and CDN configuration to serverless backend APIs and NoSQL database integration.

**Live site:** [View Resume](https://your-cloudfront-url.cloudfront.net)

---

## Architecture

![Architecture Diagram](drawing.png)

```
Visitor → Route 53 → CloudFront (HTTPS) → S3 → API Gateway → Lambda (Python) → DynamoDB
```

---

## AWS Services Used

| Service | Purpose |
|---|---|
| **Amazon S3** | Static website hosting with bucket policies |
| **Amazon CloudFront** | CDN distribution with custom SSL certificate via ACM |
| **Amazon Route 53** | DNS configuration with CNAME/A record aliases |
| **AWS API Gateway** | REST API endpoint with CORS configuration |
| **AWS Lambda** | Python function for visitor counter logic |
| **Amazon DynamoDB** | NoSQL table with atomic counter updates |
| **AWS IAM** | Least-privilege roles and execution policies |
| **Amazon CloudWatch** | Monitoring and logging |

---

## Frontend

The resume is built as a **React 18 single-page application** loaded via CDN (no build step required). The entire frontend is a single `index.html` file with inline styles and JSX, making it directly deployable to S3 or GitHub Pages.

**Design:** Dark tech theme with cyan/purple accents, responsive grid layout, animated badges, and a live visitor counter.

---

## Visitor Counter

The live visitor counter demonstrates a complete serverless data flow:

1. Page loads → `script.js` calls the API Gateway endpoint
2. API Gateway routes the request to a **Lambda function** (Python)
3. Lambda performs an atomic increment on the `count` field in **DynamoDB**
4. The updated count is returned as JSON and displayed in real-time

The Lambda source code is in [`lambda_function.py`](lambda_function.py).

---

## Files

```
├── index.html                # React 18 resume app (single file, no build step)
├── script.js                 # Visitor counter fetch logic
├── lambda_function.py        # AWS Lambda function source (Python)
├── drawing.png               # AWS architecture diagram
├── BLOG.md                   # Full technical blog post about the build
├── Saddam_Majid_Resume.docx  # Recruiter-ready Word document resume
└── README.md                 # This file
```

---

## What This Project Demonstrates

- **Cloud Architecture** — end-to-end serverless design using 8+ AWS services
- **Infrastructure as Code** — understanding of CloudFormation, Terraform, and IAM policy design
- **Security** — least-privilege IAM roles, HTTPS enforcement, CORS configuration
- **Frontend Development** — React, responsive design, API integration
- **Backend Development** — Python Lambda, REST API design, NoSQL data modelling
- **Documentation** — this README, inline code comments, and a full technical blog post

---

## About Me

AWS-certified Cloud & Infrastructure Engineer based in Melbourne, AU. Currently working as an IT Field Technician while building cloud engineering skills through certifications, homelabs, and projects like this one.

**Certifications:** AWS Solutions Architect Associate, AWS Cloud Practitioner, ITIL Foundation, Google IT Support Fundamentals

**Other projects:** [Enterprise AD Lab](https://github.com/saddammajid/enterprise-identity-network-lab) | [Active Directory Homelab](https://github.com/saddammajid/active-directory-homelab)

---

*Built by Saddam Majid as part of the Cloud Resume Challenge.*
