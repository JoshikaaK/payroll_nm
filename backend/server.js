const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/statutory", require("./routes/statutory.routes"));
app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/salary-structures", require("./routes/salaryStructure.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

