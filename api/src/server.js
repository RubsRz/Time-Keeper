const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const vacationsRoutes = require('./routes/vacationsRoutes');
const supportRoutes = require('./routes/supportRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/schedules',schedulesRoutes)
app.use('/vacations',vacationsRoutes)
app.use('/support', supportRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});