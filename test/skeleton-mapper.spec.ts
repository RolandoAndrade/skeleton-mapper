import { skeletonMap } from "../src/skeleton-mapper";

describe("skeleton mapper test", () => {
    it("one level mapping", () => {
        const source = {
            name: "Team 1",
            shield: "shield.jpg",
            university: 5,
            players: [
                {
                    name: "Poe",
                    surname: "Doe",
                },
                {
                    name: "John",
                    surname: "Msk",
                },
            ],
        };

        const skeleton = {
            teamName: "name",
            image: "shield",
            players: "players",
        };

        const r = skeletonMap(source, skeleton);


        expect(r).toMatchObject({
            teamName: source.name,
            image: source.shield,
            players: source.players,
        });
    });

    it("object complete mapping", () => {
        const source = {
            name: "Angel",
            surname: "Main",
            role: {
                id: 1,
                name: "Admin",
            },
            team: {
                id: 1,
                name: "Team 1",
                university: {
                    id: 1,
                    name: "University 1",
                },
            },
        };

        const skeleton = {
            name: "name",
            surname: "surname",
            roleId: "role.id",
            universityName: "team.university.name",
        };

        const r = skeletonMap(source, skeleton);
        expect(r).toMatchObject({
            name: source.name,
            surname: source.surname,
            roleId: source.role.id,
            universityName: source.team.university.name,
        });
    });

    it("array of object mapping", () => {
        const source = [
            {
                name: "Angel",
                surname: "Main",
                team: {
                    id: 1,
                    name: "Team 1",
                    university: {
                        id: 1,
                        name: "University 1",
                    },
                },
            },
            {
                name: "Lisa",
                surname: "Maz",
                team: {
                    id: 2,
                    name: "Team 2",
                    university: {
                        id: 2,
                        name: "University 2",
                    },
                },
            },
        ];

        const skeleton = {
            athlete: {
                name: "name",
            },
            university: {
                name: "team.university.name",
                team: {
                    id: "team.id",
                    name: "team.name"
                }
            }
        };

        const r = skeletonMap(source, skeleton);
        expect(r[0]).toMatchObject({
            athlete: {
                name: source[0].name,
            },
            university: {
                name: source[0].team.university.name,
                team: {
                    id: source[0].team.id,
                    name: source[0].team.name
                }
            }
        });
    });
});
