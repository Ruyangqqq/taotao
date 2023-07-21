import {rest} from 'msw'
import {setupServer} from 'msw/node'

console.log(`Mock server base URL: ${process.env.REACT_APP_API_BASE_URL}`);

const mockRatingsResponse = ["AO","APPROVED","Approved","G","GP"];
const mockMovieResponse = {     
    "movies": [
        {
            "_id": "573a1390f29313caabcd4135",
            "plot": "Three men hammer on an anvil and pass a bottle of beer around.",
            "title": "Blacksmith Scene",
            "fullplot": "A stationary camera looks at a large anvil",
            "rated": "UNRATED",
        },
        {
            "_id": "573a1390f29313caabcd42e8",
            "plot": "A group of bandits stage a brazen train hold-up.",
            "title": "The Great Train Robbery",
            "fullplot": "Among the earliest existing films in American cinem.",
            "rated": "TV-G",
        }],
    "page": 0,
    "filters": {},
    "entries_per_page": 20,
    "total_results": 2
}

const mockMovieByIdResponse = {
    "_id": "573a1390f29313caabcd42e8",
    "plot": "A group of bandits stage a brazen train hold-up.",
    "title": "The Great Train Robbery",
    "rated": "TV_G",
    "reviews":[
        {"_id":"64277d6fc09d78dd3ec77544",
        "name":"Testerooni Testerson",
        "user_id":"1234",
        "date":"2023-04-01T00:40:15.512Z",
        "review":"This movie is OK by me!",
        "movie_id":"573a1390f29313caabcd4135"
    },{"_id":"64277d6fc09d78dd3ec77545",
        "name":"Testerooni Testerson Too",
        "user_id":"1235",
        "date":"2023-04-02T00:40:15.512Z",
        "review":"This movie is OK by me!",
        "movie_id":"573a1390f29313caabcd4135"
        }
]
}

const mockServer = setupServer(
    rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`,
    (_, res, ctx)=> {
        return res(ctx.status(200), ctx.json(mockRatingsResponse))
    }),
    rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies`,
    (_, res, ctx) => { 
        return res(ctx.status(200),ctx.json(mockMovieResponse))
    }),
    rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/573a1390f29313caabcd42e8`,
    (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockMovieByIdResponse))
    }),
);

export default mockServer
