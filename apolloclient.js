const React = require('react');
const { render } = require('react-dom');
const {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} = require("@apollo/client");

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

function App() {
    return (
        <div>
            <h2>My first Apollo app 🚀</h2>
        </div>
    );
}

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);