# Navigating the Clouds: Building a Serverless Resume on AWS

*By Saddam Majid — Cloud & Infrastructure Engineer, Melbourne AU*

---

The [Cloud Resume Challenge](https://cloudresumechallenge.dev/) is more than a technical exercise — it's a genuine journey through the core of cloud computing. My goal was to build a real, production-grade website entirely on AWS and document every step along the way. Here's the full story.

---

## Part 1: Frontend — HTML, CSS, and React

Every cloud project starts somewhere, and mine started with web fundamentals. I initially built the resume in plain HTML and CSS, focusing on responsiveness and clean design. Later, I rebuilt the entire frontend in **React 18**, loaded via CDN with no build step required. This means the site is a single `index.html` file that can be deployed directly to S3 or GitHub Pages.

The design uses a dark theme with cyan and purple accents — a look that signals "tech" to recruiters while keeping the content scannable and professional.

**Key decisions:**
- Single-file React app (no Webpack, no build pipeline — just CDN + Babel)
- Responsive grid layout for skills badges
- JetBrains Mono font for the techy code-block elements
- Live visitor counter rendered as a React component

---

## Part 2: Hosting — Amazon S3

The resume is hosted on **Amazon S3** as a static website. I configured the bucket with:
- Static website hosting enabled
- A bucket policy that allows public read access to the site files
- Proper `index.html` as the default document

S3 is a natural fit for static sites — it's cheap, scales automatically, and requires zero server management.

---

## Part 3: CDN and HTTPS — CloudFront + ACM

A raw S3 URL doesn't inspire confidence, so I put **Amazon CloudFront** in front of the bucket. CloudFront provides:
- **HTTPS** via an SSL/TLS certificate provisioned through AWS Certificate Manager (ACM)
- **Global CDN caching** so the site loads fast from anywhere
- **Custom domain support** so the URL looks professional

This step taught me how CDN distributions work, how to configure origin access, and how certificate validation flows through DNS.

---

## Part 4: DNS — Amazon Route 53

To give the site a custom domain, I configured **Amazon Route 53** with:
- A hosted zone for my domain
- An A record (alias) pointing to the CloudFront distribution
- Proper CNAME records for the ACM certificate validation

This was my introduction to DNS management at the infrastructure level — understanding record types, TTLs, and how DNS propagation actually works.

---

## Part 5: Security — AWS IAM

Security was not an afterthought. I created dedicated **IAM roles and policies** following the principle of least privilege:
- The Lambda function has its own execution role with access only to the specific DynamoDB table it needs
- S3 bucket policies restrict access appropriately
- No overly permissive wildcards — every policy is scoped

This taught me that IAM is the foundation of everything in AWS. Get it wrong and nothing else matters.

---

## Part 6: The Serverless Backend — API Gateway, Lambda, and DynamoDB

The most interesting part of the project was building the **visitor counter** — a real serverless data flow:

```
Browser → API Gateway → Lambda (Python) → DynamoDB → Response
```

**API Gateway** exposes a REST endpoint with CORS headers configured so the browser can call it cross-origin.

**Lambda** runs a Python function that:
1. Connects to DynamoDB using `boto3`
2. Atomically increments a counter using `UpdateExpression`
3. Returns the updated count as JSON

**DynamoDB** stores a single item with a `count` attribute. The atomic `SET count = count + 1` pattern means there are no race conditions, even under concurrent traffic.

Here's the core of the Lambda function:

```python
response = table.update_item(
    Key={'id': '1'},
    UpdateExpression='SET #count = #count + :incr',
    ExpressionAttributeNames={'#count': 'count'},
    ExpressionAttributeValues={':incr': 1},
    ReturnValues='UPDATED_NEW'
)
```

**CORS** was the trickiest part. I had to configure:
- `Access-Control-Allow-Origin: *` in the Lambda response headers
- An OPTIONS preflight method in API Gateway
- Proper `Content-Type: application/json` headers

The DevTools network tab became my best friend during debugging.

---

## Part 7: Monitoring — CloudWatch

With the serverless stack running, I used **Amazon CloudWatch** to:
- Monitor Lambda invocations and errors
- Track API Gateway request counts and latency
- Set up basic logging for debugging

Even for a simple project, observability matters. CloudWatch showed me how AWS services report metrics and how to trace issues across the stack.

---

## Architecture Overview

![Architecture Diagram](drawing.png)

```
Visitor → Route 53 → CloudFront → S3 → API Gateway → Lambda → DynamoDB
```

---

## Reflections and Key Takeaways

Building this project taught me more than any certification exam:

- **S3** is deceptively powerful — static hosting, bucket policies, and versioning are essential AWS skills
- **IAM** is the real skill — writing least-privilege policies is harder than it looks and more important than anything else
- **Serverless** is genuinely elegant — Lambda + API Gateway + DynamoDB is a pattern I'll use again and again
- **CORS** will humble you — understanding preflight requests and response headers is a rite of passage
- **DNS** is foundational — Route 53 configuration taught me how the internet actually works at the infrastructure level
- **Documentation matters** — writing this blog and the project README forced me to deeply understand every decision I made

---

## What's Next

This project is the foundation, not the finish line. I'm planning to:
- Add **Terraform** to provision the entire stack as Infrastructure as Code
- Set up **GitHub Actions** for CI/CD deployment on every push
- Expand the site with a blog section for technical writing
- Build additional AWS projects to demonstrate broader cloud skills

---

## Connect

If you're working on the Cloud Resume Challenge or building your own cloud projects, let's connect:

- **Live site:** [View Resume](https://your-cloudfront-url.cloudfront.net)
- **GitHub:** [github.com/saddammajid](https://github.com/saddammajid)
- **LinkedIn:** [linkedin.com/in/saddam-h-majid](https://linkedin.com/in/saddam-h-majid)

---

*Built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/) by Saddam Majid.*
