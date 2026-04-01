## Helmet.js Configuration

### Configuration Applied

\`\`\`typescript helmet({
    contentSecurityPolicy: false, // Not needed for JSON APIs
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    hidePoweredBy: true,
    noSniff: true,

    frameguard: { action: "deny" },
}); \`\`\`

### Justification

1. **contentSecurityPolicy: false** - Disabled because this API returns only
   JSON data and does not serve HTML content. CSP is designed to prevent XSS in
   browsers rendering HTML.

2. **crossOriginEmbedderPolicy: false** - Disabled because api documention and
 testing tools can run into blocked errors when trying to load resources across 
 different local ports, so this ensures that it does not run into such issue.

3. **hsts** - Enabled with 1-year max-age to enforce HTTPS connections. it forces any user
to access my api using https, which secures my data transit and prevent man in the middle attacks.

4. **hidePoweredBy: true** - Enabled because express advertises itself in the 
response headers, this removes this advert which improves security by making it hard
for attackers to identify my frameWork. this is a form of security by
obscurity from OWASP top ten Vulnerabilities.

5. **noSniff: true** - Enabled to prevent the browser from trying to deplay a file type 
as another, like trying to display or treat a JSON file as a HTML file.

6. **frameguard: {action: deny}** - this will prevent other sites from embedding api responses
with in frames, this will serve as a defense against clickjacking attacks.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/
3. Swagger Documentation - https://swagger.io/docs/


## Cors.js Configuration

### Configuration Applied

\`\`\`typescript cors({
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }; \`\`\`

### Justification

1. **development(origin: true)** - This will allow any local tools to 
interact with my api without blocked request error.

2. **credentials: true** - This allows my api to support requests that includes 
cookies or Authorization headers which is necessary for secure user sessions and
authenticated CRUD operations.

3. **production(origin: restricted to .env)** - This prevents malicious websites from
making unauthorized cross-origin requests to my events api which ensures that users data
are protected.

4. **production(method: Get, Post, Put, Delete)** - This ensures that only provided methods
aare permitted, which reduces the risk of unexpected exploitation.

### Sources

1. Express CORS Documentation - https://www.npmjs.com/package/cors
2. MDN Web Docs - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS