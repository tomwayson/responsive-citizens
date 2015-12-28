Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

### Before filing an issue

Please take a look at [previous issues](https://github.com/Esri/cedar/issues?labels=FAQ&milestone=&page=1&state=closed) that resolve common problems.


##### More examples

The Esri Cedar website is written using http://assemble.io/ and can be found at https://github.com/Esri/cedar/tree/master/site/source. You can use the existing examples as a reference.
  

##### Support for new chart types types

Support for new chart types is always needed.



### Setting up a dev environment

Make Sure you have the [Grunt CLI](http://gruntjs.com/getting-started) installed.

1. [Fork and clone Esri Cedar](https://help.github.com/articles/fork-a-repo)
1. `cd` into the `cedar` folder
1. Install the dependencies with `npm install`
1. Install additional dependencies with `bower install`
1. Run `grunt docs` from the command line. This will start the web server locally at [http://localhost:8001](http://localhost:8001) and start watching the source files and running linting and testing commands.
1. Push your changes using `grunt docs:deploy` which pushes to your `origin/gh-pages`
1. Create a [pull request](https://help.github.com/articles/creating-a-pull-request) to `esri/cedar/gh-pages`

### Linting

Please make sure your changes pass JS Hint. This will help make sure code is consistant through out Esri Cedar. You can run JS Hint with `grunt jshint`.

### Testing

Please make sure your changes dont break existing tests. Testing is essential for determining backward compatibility and catching breaking changes. You can run tests with `grunt karma:run`, `grunt karma:watch` or `grunt karma:coverage.`
