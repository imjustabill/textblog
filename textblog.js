// TODO: markdown support

(function( $ ) {
	$.fn.textBlog = function() {

		this.each(function(){

			// Auto load posts once we reach the bottom of the page
			$(window).scroll(function(){!
				var maxDistFromBottom = 100;

				if ($(window).scrollTop() + $(window).height() > 
					$(document).height() - maxDistFromBottom && morePosts == true) { 
						alert('loading more!');
						morePosts = false; // TODO: best way to handle this?
						fetchPage();
					} 
			});

			var plugin = this;
			var pageSize = 5
			var pageNum = 1;
			var baseUrl = 'http://billeberly.com/blog';
			var allPosts = [];
			var useMarkdown = true;
			var morePosts = false; 
			var startPost = 0;

			loadIndex();

			function loadIndex() {
				// Get list of posts from directory index
				$.ajax({
					url: baseUrl + '/?C=N;O=D',
					success: function(data,status){
						$(data).find('a').each(function() {
							var fileName = $(this).text();
							if(fileName.match('\.blog$')) {
								allPosts.push(fileName);
							}
						});
						allPosts.sort().reverse();
						fetchPage();
					},
					error: function(){plugin.append('<div class="postContainer">Error loading posts</div>');}
				});
			}

			function fetchPage () {
	
				// TODO: why the heck is this a for loop?
				for(;startPost  < pageSize*pageNum && startPost < allPosts.length; ++startPost){
					var postContainer = $('<div class="postContainer"></div>');
					$(plugin).append(postContainer)
					buildPost(postContainer, allPosts[startPost]); // TODO: this var name is bad
				}
				++pageNum;

				// We didn't load all posts, load more when the end is reached
				if(startPost < allPosts.length){
					morePosts = true;
				} else {
					morePosts = false;
				}
			}

			function buildPost(postContainer, fileName){
				$.ajax({
					url: baseUrl + '/' + fileName,
					success:function(data,status){

						// Each .blog contains a line with the title, timestamp, and post

						// Get all the lines from the file
						var lines = data.split('\n');

						// Title is the first line
						var postTitle = lines[0];

						// Time in seconds is the second line
						var timestamp = new Date(0);
						timestamp.setUTCSeconds(lines[1]);

						// Actual post starts on the 3rd line. All following lines are part of the post
						// Combine all of them. No seperators are added between lines. User is responsible for spacing.
						var postContent = lines.slice(2).join('');

						$(postContainer).append('<div class="postTitle">'+ postTitle+ '</div>' + 
								'<div class="post">' + postContent + '</div><div class="timestamp">Posted on '+ timestamp.toDateString() + '</div></div>');

						$(plugin).append(postContainer);

					}
				});

			}

		});

	};
})( jQuery );
