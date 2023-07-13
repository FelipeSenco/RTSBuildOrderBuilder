﻿using Domain.Models;
using Domain.Models.Interfaces;

namespace Domain.Mocks
{
    public static class StormgateBuildOrdersMock
    {
        private static List<StormgateBuildOrder> sotmrgateOrdersMock = new()
        {
            new StormgateBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000001"),
                Name = "Build Order 1",
                Description = "This is build order 1",
                Game = Games.Stormgate,
                Faction = (int)StormgateFactions.HUMAN_RESISTANCE,
                OpponentFaction = (int)StormgateFactions.INFERNAL_HOST,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build an altar of kings" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Brockon Johnson",
                Patch = "1.0.0",
                VideoUrl = null,
                Considerations = "Consideration 1",
                GameMode = (int)StormgateGameModes.ONEvONE
            },
            new StormgateBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000002"),
                Name = "Build Order 2",
                Description = "This is build order 2",
                Game = Games.Stormgate,
                Faction = (int)StormgateFactions.INFERNAL_HOST,
                OpponentFaction = (int)StormgateFactions.INFERNAL_HOST,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a great hall" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a burrow" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "John Doe",
                Patch = "1.2.0",
                VideoUrl = null,
                Considerations = "Consideration 2",
                GameMode = (int)StormgateGameModes.COOP
            },
            new StormgateBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000003"),
                Name = "Build Order 3",
                Description = "This is build order 3",
                Game = Games.Stormgate,
                Faction = (int)StormgateFactions.HUMAN_RESISTANCE,
                OpponentFaction = (int)StormgateFactions.HUMAN_RESISTANCE,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Jane Smith",
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 3",
                GameMode = (int)StormgateGameModes.THREEvTHREE
            },
            new StormgateBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000004"),
                Name = "Build Order 4",
                Description = "This is build order 4",
                Game = Games.Stormgate,
                Faction = (int)StormgateFactions.INFERNAL_HOST,
                OpponentFaction = (int)StormgateFactions.HUMAN_RESISTANCE,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Jane Smith",
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 4",
                GameMode = (int)StormgateGameModes.ONEvONE
            },
            new StormgateBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000005"),
                Name = "Build Order 5",
                Description = "This is build order 5",
                Game = Games.Stormgate,
                Faction = (int)StormgateFactions.INFERNAL_HOST,
                OpponentFaction = (int)StormgateFactions.HUMAN_RESISTANCE,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Test Tilter",
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 5",
                GameMode = (int)StormgateGameModes.ONEvONE
            }
        };

        public static List<StormgateBuildOrder> StormgateOrdersMock { get => sotmrgateOrdersMock; set => sotmrgateOrdersMock = value; }
    }
}