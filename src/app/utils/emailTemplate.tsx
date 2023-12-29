export const reposEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Template</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
    }
    h1 {
      color: #ef476f;
      text-align: center;
      margin-top: 0;
      font-family: 'Helvetica', sans-serif;
    }
    p {
      color: #555;
      line-height: 1.5;
      font-family: 'Georgia', serif;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #888;
    }

    h2 {
      text-align: center;
      color: #3498db;
    }
    .repository {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #ecf0f1;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>See what the GitHub community is most excited about today.</h1>
    <% repos.forEach(repo => { %>
      <div class="repository">
        <h2><%= repo.name %></h2>
        <p>Link: <%= repo.link %></p>
        <p>Description: <%= repo.description %></p>
      </div>
    <% }); %>
    <div class="footer">
      <p>This is an auto-generated message. Please do not reply.</p>
      <a href="https://github.com/poysa213">My github</a>
    </div>
  </div>
</body>
</html>
`