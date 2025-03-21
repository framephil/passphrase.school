/**
 * API Router
 * 
 * This file serves as the entry point for API requests.
 * It routes requests to the appropriate handlers.
 */

const generateHandler = require('./generate.js');

// Main API router
function handleApiRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    // Route to the appropriate handler based on the path
    if (pathname === '/api/generate' || pathname === '/api') {
        return generateHandler(req, res);
    }
    
    // Handle 404 for unknown API endpoints
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        success: false,
        error: 'API endpoint not found'
    }));
}

// Export the handler for use with various environments
module.exports = handleApiRequest;
