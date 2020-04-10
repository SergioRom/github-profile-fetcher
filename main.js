$(document).ready(() => {
  $('#searchUser').on('keyup', (e) => {
    let username = e.target.value;

    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: 'ab65709648e55b6c4256',
        client_secret: '3be2ef3c3c61b8f9323547574331b6d8b3c2c719',
      },
      error: () => {
        if (username != '') {
          $('#profile').html(`
          <h1 style="height:50vh;display:flex;flex-direction:column;justify-content:center;align-items:center">
            The User Doesn't Exist :(
          </h1>
        `);
        } else {
          $('#profile').html(``);
        }
      },
    }).done((user) => {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: 'ab65709648e55b6c4256',
          client_secret: '3be2ef3c3c61b8f9323547574331b6d8b3c2c719',
          sort: 'created:asc',
          per_page: 5,
        },
      }).done((repos) => {
        $('#repos').html(``);
        $.each(repos, (index, repo) => {
          $('#repos').append(`
            <div class="card card-body" style="background-color: #f7f7f7">
              <div class="row">
                <div class="col-md-6">
                  <strong>${repo.name}</strong>
                </div>
                <div class="col-md-4">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-info">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary">Repo Page</a>
                </div>
              </div>
            </div>
            <br>
          `);
        });
      });

      $('#profile').html(`
        <div class="card">
            <div class="card-header">
                ${user.name}
            </div>
            <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <img class="img-thumbnail" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                  </div>
                  <div class="col-md-9">
                    <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-info">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-danger">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                      <li class="list-group-item">Company: ${user.company}</li>
                      <li class="list-group-item">Website: ${user.blog}</li>
                      <li class="list-group-item">Location: ${user.location}</li>
                      <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                  </div>
                </div>
            </div>
        </div>
        <br><br>
        <h3 class="page-header">Latest Repos</h3>
        <hr>
        <div id="repos"></div>
      `);
    });
  });
});
