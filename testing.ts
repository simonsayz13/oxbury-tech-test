app.get("/applications", (req, res) => {
  const { farmer_id, farmer_name, farmer_city } = req.query;

  // Load farmers and applications from files
  const farmers = require("./farmers.json");
  const applications = require("./applications.json");

  // Join applications with farmers to include farmer properties in the response
  const joined = applications.map((app) => {
    const farmer = farmers.find((farmer) => farmer.id === app.farmer_id);
    return {
      ...app,
      farmer_name: farmer ? farmer.name : "",
      farmer_city: farmer ? farmer.city : "",
    };
  });

  // Filter applications based on query params
  let filtered = joined.filter((app) => {
    let match = true;
    if (farmer_id && app.farmer_id !== farmer_id) {
      match = false;
    }
    if (farmer_name && app.farmer_name !== farmer_name) {
      match = false;
    }
    if (farmer_city && app.farmer_city !== farmer_city) {
      match = false;
    }
    return match;
  });

  // Paginate response
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = filtered.slice(startIndex, endIndex);

  // Return response with status 200
  res.status(200).json(results);
});
