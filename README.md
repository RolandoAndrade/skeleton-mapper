# SKELETON MAPPER

This module provides an easy object mapper from a template skeleton.

## Mapping objects

The definition of the function is:

```typescript
declare function skeletonMap(
    source: {[key: string]: any} | {[key: string]: any}[],
    skeleton: {[key: string]: string},
    addUndefinedFields = false
): {[key: string]: any} | {[key: string]: any}[]
```

- `source` is an object, or a collection of objects. 

- `skeleton` is the template to be mapped, its keys should have as value the fields from the source object. 
If the field is inside an object, you can access it by a dot notation.
- `addUndefinedFields` maps the undefined fields inside the result object (usually keys undefined are not given).

## Examples

Map an object

```typescript
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

        /*
            {
                teamName: "Team 1",
                image: "shield.jpg",
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
            }
        */
```

Map keys inside keys using dot notation

```typescript
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

        /*
            {
                name: "Angel",
                surname: "Main",
                roleId: 1,
                universityName: "University 1",
            }
        */
```

Map an array and give a different shape as output

```typescript
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

        /*
            [
                {
                    athlete: {
                        name: "Angel",
                    },
                    university: {
                        name: "University 1",
                        team: {
                            id: 1,
                            name: "Team 1"
                        }
                    }
                },
                {
                    athlete: {
                        name: "Lisa",
                    },
                    university: {
                        name: "University 2",
                        team: {
                            id: 2,
                            name: "Team 2"
                        }
                    }
                }
            ]
        */
```