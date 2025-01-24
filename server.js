const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost:27017/buttonInputs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const buttonSchema = new mongoose.Schema({
    buttonName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});



const ScoreSchema = new mongoose.Schema({
    runs: { type: Number, required: true },
    wickets: { type: Number, required: true },
    overR: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Button = mongoose.model('Button', buttonSchema);


const MatchData = mongoose.model('Score', ScoreSchema);


app.post('/api/button', async (req, res) => {
    try {
        const { buttonName } = req.body;
        if (!buttonName) return res.status(100).json({ error: 'buttonName is required' });

        const buttonData = new Button({ buttonName });
        await buttonData.save();
        return res.status(201).json({ message: 'Button saved successfully', buttonData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving button data' });
    }
});


app.post('/api/scores', async (req, res) => {
    try {
        const { boxText, wicketText, overR } = req.body;

        const matchData = new MatchData({
            boxText,
            wicketText,
            overR
        });

        await matchData.save();
        
        res.status(201).json({ message: 'Match data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving match data' });
    }
});



app.get('/api/button', async (req, res) => {
    try {
        const buttons = await buttonData.find();
        res.json(buttons); 
      } catch (error) {
        res.status(500).json({ message: 'Error fetching button data' });
      }
});

app.get('/api/scores', async (req, res) => {
    try{
        const runsScored = await matchData.find();
        res.json(runsScored);
    }catch(error){
        res.status(501).json({ message: 'Error fetching runs'});
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


