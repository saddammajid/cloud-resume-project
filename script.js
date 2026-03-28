// Fetch visitor count from AWS API Gateway → Lambda → DynamoDB
window.addEventListener('load', function () {
    fetch('https://cqypt032g9.execute-api.us-east-1.amazonaws.com/prod/visitorcount1')
        .then(function (response) {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(function (data) {
            document.getElementById('visitorCount').textContent = '👁 Visitors: ' + data.count;
        })
        .catch(function (error) {
            console.error('Visitor counter error:', error);
            document.getElementById('visitorCount').textContent = '👁 Visitor counter unavailable';
        });
});