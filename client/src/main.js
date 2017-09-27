let reposTemplate = $('#repos-template').html();
let renderRepos = Handlebars.compile(reposTemplate);


let searchesTemplate = $('#searches-template').html();
let renderSearches = Handlebars.compile(searchesTemplate);

let searches = [];


$('#search-button').on('click', function(){
    let searchTerm = $('#search-bar').val();
    console.log(searchTerm);
    $.getJSON(`https://api.github.com/users/${searchTerm}/repos`, function(results) {
        console.log(results);
        renderReposList(results);
    }, function(response) {
        toastr.error('Invalid Github username');
    });
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/searches',
        data: {
            term: searchTerm, 
            createdAt: new Date()
        }
    }).then(function(response) {
        searches.push(response);
        $('#search-history').html(renderSearches({
            searches: searches
        }));
    });
});


function renderReposList(repos) {
    let reposHTML = renderRepos({
        repos: repos
    });
    $('#repo-list').html(reposHTML);
  }

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/searches'
  }).then(function(response) {
    $('#search-history').append(renderSearches({
      searches: response
    }));
  
    // part of Approach 3 for creating a post
    searches = response;
  });
  