const { where, attributes } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const hostel = require("../models/hostel");
const { tournament_participants, matches } = db.models;

const createMatches = catchAsync(async(req, res) => {
    const { tournament_id, stage } = req.body;
    const entries = await matches.findAll(
        {   // SELECT * FROM matches WHERE blah blah blah
            where: {
                tournament_id: tournament_id,
                stage: stage,
            }
        }
    );
    if( !(entries.length === 0) ){
        res.status(400).send("Stage Already Present...")
        return;
    }
    let selectedHostels;
    if(stage === 0){
        selectedHostels = await tournament_participants.findAll(
            {
                attributes: ['hostel_id'],
                where: {
                    tournament_id: tournament_id,
                }
            }
        )
    } else {
        selectedHostels = await matches.findAll(
            {   //SELECT winner AS hostel_id FROM matches WHERE blah blah blah...
                attributes: [['winner', 'hostel_id']],
                where: {
                    tournament_id: tournament_id,
                    stage: stage-1,
                }
            }
        )
    }
    if(selectedHostels.length === 0){
        res.status(400).send("Previous Stage not completed");
        return;
    }
    selectedHostels.forEach(hostel => {
        if(hostel.dataValues.hostel_id === null){
            res.status(400).send("Previous Stage not completed...");
            return;
        }        
    });
    if(selectedHostels.length === 1){
        res.status(400).send("Stages Complete no new participants")
        return;
    }

    const matchups = generateMatchups(selectedHostels);
    const matchInstances = matchups.map(matchup => {
        return {
            stage: stage, 
            tournament_id: tournament_id, 
            hostel_id_1: matchup[0].hostel_id, 
            hostel_id_2: matchup[1].hostel_id,
        }
    })

    const data = await matches.bulkCreate(matchInstances);

    res.send(data);
})

function generateMatchups(hostels) {
    const matchups = [];
    // Shuffle the hostels array randomly
    const shuffledHostels = hostels.sort(() => Math.random() - 0.5);
    // Generate matchups
    for (let i = 0; i < shuffledHostels.length; i += 2) {
        let hostel_id_1, hostel_id_2

        hostel_id_1 = shuffledHostels[i].dataValues;
        
        //if end of array reached then take hostel2 as null
        if(i+1 == shuffledHostels.length){
            hostel_id_2 = {hostel_id: null}
        } else {
            hostel_id_2 = shuffledHostels[i + 1].dataValues;
        }

        matchups.push([hostel_id_1, hostel_id_2]);
    }
    
    return matchups;
};

// update winner of the match. post request body must contain the match_id and winner. 
const updateWinner = catchAsync(async(req, res) => {
    let { match_id, winner } = req.body;
    const matchDetails = await matches.findByPk(match_id);
    if(matchDetails.hostel_id_2 === null){ // If a hostel does not play with anyone it is declared as the winner automatically
        winner = matchDetails.hostel_id_1;
    }
    if(winner != matchDetails.hostel_id_1 && winner != matchDetails.hostel_id_2){
        res.status(400).send("Winner must be one of the participants...")
        return;
    }
    const updatedMatch = await matches.update(
        {
            winner: winner,
            date: Date.now(),
        },
        {
            where: {id: match_id}
        },
    )
    res.send(updatedMatch);
});

const getMatches = catchAsync(async(req, res) => {
    const { tournamentId, stage } = req.params
    const data = await matches.findAll(
        {
            where: {
                tournament_id: tournamentId,
                stage: stage,
            },
        }
    )
    res.send(data);
})

module.exports = {
    createMatches,
    updateWinner,
    getMatches,
};