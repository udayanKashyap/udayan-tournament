const { where, Op } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { tournaments, tournament_participants } = db.models;

const getTournaments = catchAsync(async (req, res) => {
    const data = await tournaments.findAll();
    res.send(data);
});

const createTournament = catchAsync(async (req, res) => {
    const {
        id,
        name,
        start_date,
        end_date,
        status,
        num_players,
        hostels_participating
    } = req.body;
    console.log(req.body);
    const data1 = await tournaments.create({ id, name, start_date, end_date, status, num_players });

    const junctionArray = hostels_participating.map(hostelId => {
        return { hostel_id: hostelId, tournament_id: data1.id }
    })
    const data2 = await tournament_participants.bulkCreate(junctionArray);

    res.json({ tournament: data1, participants: data2 });
});

const getTournamentsOfHostel = catchAsync(async (req, res) => {
    const { hostelId } = req.params;
    let myTournamentIds = await tournament_participants.findAll({
        attributes: ['tournament_id'],
        where: {
            hostel_id: hostelId,
        }
    });
    if (myTournamentIds.length === 0) {
        res.status(201).send([])
        return;
    }
    myTournamentIds = myTournamentIds.map(tournamentInstance => {
        return { id: tournamentInstance.dataValues.tournament_id };
    })
    const myTournaments = await tournaments.findAll({
        where: {
            [Op.or]: myTournamentIds,
        },
    })
    console.log(myTournaments)

    res.status(201).send(myTournaments);
})

module.exports = {
    getTournaments,
    createTournament,
    getTournamentsOfHostel,
};

/* NOTE
hostels_participating is an array that must contain only the hostel_ids of the participating hostels
id is the tournament_id that is provided by the user
*/