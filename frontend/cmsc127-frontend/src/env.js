
const server = "localhost:3001";
const header = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`
    }
}

const ENV = {
    "SERVER": server,
    "HEADER": header
};

export default ENV;