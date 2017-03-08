# Angular Google Static Maps Directive

An [AngularJS](http://angularjs.org/) directive to quickly insert [Google Static
Maps](https://developers.google.com/maps/documentation/staticmaps/).

## Usage

1. `bower install --save angular-google-staticmaps`
2. Include dependencies in your HTML.
3. Load the `tbc.ngGoogleStaticMaps` module for your Angular app.
4. Use the `static-google-map` directive.

## Example

```html
<static-google-map size="137x137" markers="markers" sensor="false" zoom="14"></static-google-map>
```

The `markers` attribute can contain one or multiple markers.
Markers have the following format:

```javascript
$scope.markers = [{
    color: 'blue',
    label: 'S',
    coords: [lat, lng]
}];
```

## Attributes

Any attribute is directly passed to the generated URL the image is loaded from,
except for `markers`, which gets formatted according to the specification.

### `size` (required)

The size attribute is required and must be specified as `WIDTHxHEIGHT` whereby `WIDTH`
denotes the width and pixels and `HEIGHT` the height.

### `sensor` (required)

The sensor attribute must explicitly be set to either `true` or `false`.

## Contributing

Pull requests welcome. Only change files in `src` and don't bump any versions.
Please respect the code style in place.

## License

MIT