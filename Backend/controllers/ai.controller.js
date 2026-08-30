const Groq = require("groq-sdk");
const Properties = require("../models/Properties");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});




const searchProperties = async (args) => {
    try {
        const query = {};


        if (args.location) {
            query.location = {
                $regex: args.location,
                $options: "i",
            };
        }


        if (
            args.minPrice !== null ||
            args.maxPrice !== null
        ) {
            query.price = {};

            if (args.minPrice !== null) {
                query.price.$gte = args.minPrice;
            }

            if (args.maxPrice !== null) {
                query.price.$lte = args.maxPrice;
            }
        }



        if (
            args.minBedrooms !== null ||
            args.maxBedrooms !== null
        ) {
            query.bedroom = {};

            if (args.minBedrooms !== null) {
                query.bedroom.$gte = args.minBedrooms;
            }

            if (args.maxBedrooms !== null) {
                query.bedroom.$lte = args.maxBedrooms;
            }
        }


        if (
            args.minBathrooms !== null ||
            args.maxBathrooms !== null
        ) {
            query.bathroom = {};

            if (args.minBathrooms !== null) {
                query.bathroom.$gte = args.minBathrooms;
            }

            if (args.maxBathrooms !== null) {
                query.bathroom.$lte = args.maxBathrooms;
            }
        }


        console.log("AI generated MongoDB query:");
        console.log(query);




        const properties = await Properties
            .find(query)
            .limit(10)
            .lean();

        return properties.map((property) => ({
            id: property._id.toString(),
            name: property.name,
            description: property.description,
            image: property.image,
            price: property.price,
            location: property.location,
            bedroom: property.bedroom,
            bathroom: property.bathroom,
            latitude: property.latitude,
            longitude: property.longitude,
        }));

    } catch (error) {

        console.error("Search Properties Error:", error);

        throw new Error("Unable to search properties");
    }
};



const tools = [
    {
        type: "function",

        function: {
            name: "search_properties",

            description:
                "Search the Luxury Estate database for properties matching the user's requirements such as location, price, bedrooms and bathrooms.",

            strict: true,

            parameters: {
                type: "object",

                properties: {

                    location: {
                        type: ["string", "null"],

                        description:
                            "The preferred property location. Use null if the user did not specify a location.",
                    },

                    minPrice: {
                        type: ["number", "null"],

                        description:
                            "Minimum property price. Use null if the user did not specify a minimum price.",
                    },

                    maxPrice: {
                        type: ["number", "null"],

                        description:
                            "Maximum property price. Use null if the user did not specify a maximum price.",
                    },

                    minBedrooms: {
                        type: ["number", "null"],

                        description:
                            "Minimum number of bedrooms. Use null if the user did not specify a minimum.",
                    },

                    maxBedrooms: {
                        type: ["number", "null"],

                        description:
                            "Maximum number of bedrooms. Use null if the user did not specify a maximum.",
                    },

                    minBathrooms: {
                        type: ["number", "null"],

                        description:
                            "Minimum number of bathrooms. Use null if the user did not specify a minimum.",
                    },

                    maxBathrooms: {
                        type: ["number", "null"],

                        description:
                            "Maximum number of bathrooms. Use null if the user did not specify a maximum.",
                    },
                },

                required: [
                    "location",
                    "minPrice",
                    "maxPrice",
                    "minBedrooms",
                    "maxBedrooms",
                    "minBathrooms",
                    "maxBathrooms",
                ],

                additionalProperties: false,
            },
        },
    },
];



const SYSTEM_PROMPT = `
You are Luxury Estate AI, an intelligent real-estate assistant.

Your job is to help users discover properties from the Luxury Estate
property database.

AVAILABLE PROPERTY INFORMATION:

- name
- description
- price
- location
- bedroom
- bathroom
- image
- latitude
- longitude


IMPORTANT RULES:

1. When the user asks to find, search, show or recommend properties,
   ALWAYS use the search_properties tool.

2. NEVER invent a property.

3. NEVER invent a price.

4. NEVER invent a location.

5. NEVER invent bedrooms or bathrooms.

6. Only use property information returned by the search_properties tool.

7. If the user does not specify a particular filter, use null.

8. Understand natural language and convert it into appropriate filters.

Examples:

User:
"Show me 3 BHK properties in Gurgaon"

Use:

location = "Gurgaon"
minBedrooms = 3
maxBedrooms = 3

User:
"Properties under 80 lakhs"

Use:

maxPrice = 8000000

User:
"Properties between 50 lakh and 1 crore"

Use:

minPrice = 5000000
maxPrice = 10000000

User:
"2 to 3 bedroom properties in Delhi"

Use:

location = "Delhi"
minBedrooms = 2
maxBedrooms = 3

9. Do not create filters for information that does not exist in the
   database.

For example, the database currently does NOT contain parking,
amenities, property type or metro distance.

10. If there are no matching properties, clearly tell the user.

11. Keep the final answer concise.

12. When properties are found, mention the number of matching properties.

13. Never expose MongoDB queries or internal implementation details
    to the user.
`;



const chatWithAgent = async (req, res) => {

    try {

        const { message } = req.body;


        if (
            !message ||
            typeof message !== "string" ||
            !message.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }



        const messages = [

            {
                role: "system",
                content: SYSTEM_PROMPT,
            },

            {
                role: "user",
                content: message.trim(),
            },

        ];


        let finalResponse = null;

        let allPropertyIds = [];

        const MAX_ITERATIONS = 5;


        for (
            let iteration = 0;
            iteration < MAX_ITERATIONS;
            iteration++
        ) {

            console.log(
                `AI iteration: ${iteration + 1}`
            );


            const completion =
                await groq.chat.completions.create({

                    model: "openai/gpt-oss-120b",

                    messages,

                    tools,

                    tool_choice: "auto",

                    temperature: 0.2,
                });


            const assistantMessage =
                completion.choices[0].message;

            messages.push(assistantMessage);

            const toolCalls =
                assistantMessage.tool_calls;


            if (
                !toolCalls ||
                toolCalls.length === 0
            ) {

                finalResponse =
                    assistantMessage.content;

                break;
            }

            for (const toolCall of toolCalls) {

                const functionName =
                    toolCall.function.name;


                const functionArguments =
                    JSON.parse(
                        toolCall.function.arguments
                    );


                console.log(
                    "Tool:",
                    functionName
                );

                console.log(
                    "Arguments:",
                    functionArguments
                );


                let toolResult;
                if (
                    functionName ===
                    "search_properties"
                ) {

                    toolResult =
                        await searchProperties(
                            functionArguments
                        );


                    allPropertyIds.push(
                        ...toolResult.map(
                            (property) =>
                                property.id
                        )
                    );

                }

                else {

                    toolResult = {
                        error:
                            "Unknown tool requested",
                    };
                }


                messages.push({

                    role: "tool",

                    tool_call_id:
                        toolCall.id,

                    content:
                        JSON.stringify(
                            toolResult
                        ),
                });
            }
        }

        if (!finalResponse) {

            finalResponse =
                "I couldn't complete the property search. Please try again.";
        }

        allPropertyIds =
            [...new Set(allPropertyIds)];


        return res.status(200).json({

            success: true,

            message: finalResponse,

            propertyIds:
                allPropertyIds,

        });


    } catch (error) {

        console.error(
            "Luxury Estate AI Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong with the AI assistant.",

        });
    }
};



module.exports = {
    chatWithAgent,
};