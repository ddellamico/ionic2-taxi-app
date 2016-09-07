// CONVERTED FROM : https://raw.githubusercontent.com/sgruhier/google_maps_mock/master/google_maps_mock.coffee

var GoogleMapsMock,
  extend = function (child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  },
  hasProp = {}.hasOwnProperty;

this.google = {
  maps: {
    event: {
      addDomListener: function () {
      },
      addDomListenerOnce: function () {
      },
      addListener: function () {
      },
      addListenerOnce: function () {
      },
      bind: function () {
      },
      clearInstanceListeners: function () {
      },
      clearListeners: function () {
      },
      forward: function () {
      },
      removeListener: function () {
      },
      trigger: function () {
      },
      vf: function () {
      }
    }
  }
};

GoogleMapsMock = (function () {
  function GoogleMapsMock() {
  }

  GoogleMapsMock.prototype.setMap = function () {
  };

  GoogleMapsMock.prototype.getMap = function () {
  };

  return GoogleMapsMock;

})();

google.maps.LatLng = (function (superClass) {
  extend(LatLng, superClass);

  function LatLng(lat, lng) {
    this.latitude = parseFloat(lat);
    this.longitude = parseFloat(lng);
  }

  LatLng.prototype.lat = function () {
    return this.latitude;
  };

  LatLng.prototype.lng = function () {
    return this.longitude;
  };

  return LatLng;

})(GoogleMapsMock);

google.maps.LatLngBounds = (function (superClass) {
  extend(LatLngBounds, superClass);

  function LatLngBounds(ne, sw) {
    this.ne = ne;
    this.sw = sw;
  }

  LatLngBounds.prototype.getSouthWest = function () {
    return this.sw;
  };

  LatLngBounds.prototype.getNorthEast = function () {
    return this.ne;
  };

  return LatLngBounds;

})(GoogleMapsMock);

google.maps.OverlayView = (function (superClass) {
  extend(OverlayView, superClass);

  function OverlayView() {
    return OverlayView.__super__.constructor.apply(this, arguments);
  }

  return OverlayView;

})(GoogleMapsMock);

google.maps.Marker = (function (superClass) {
  extend(Marker, superClass);

  function Marker() {
    return Marker.__super__.constructor.apply(this, arguments);
  }

  Marker.prototype.getAnimation = function () {
  };

  Marker.prototype.getClickable = function () {
  };

  Marker.prototype.getCursor = function () {
  };

  Marker.prototype.getDraggable = function () {
  };

  Marker.prototype.getFlat = function () {
  };

  Marker.prototype.getIcon = function () {
  };

  Marker.prototype.getPosition = function () {
  };

  Marker.prototype.getShadow = function () {
  };

  Marker.prototype.getShape = function () {
  };

  Marker.prototype.getTitle = function () {
  };

  Marker.prototype.getVisible = function () {
  };

  Marker.prototype.getZIndex = function () {
  };

  Marker.prototype.setAnimation = function () {
  };

  Marker.prototype.setClickable = function () {
  };

  Marker.prototype.setCursor = function () {
  };

  Marker.prototype.setDraggable = function () {
  };

  Marker.prototype.setFlat = function () {
  };

  Marker.prototype.setIcon = function () {
  };

  Marker.prototype.setPosition = function () {
  };

  Marker.prototype.setShadow = function () {
  };

  Marker.prototype.setShape = function () {
  };

  Marker.prototype.setTitle = function () {
  };

  Marker.prototype.setVisible = function () {
  };

  Marker.prototype.setZIndex = function () {
  };

  Marker.prototype.setMap = function () {
  };

  Marker.prototype.getMap = function () {
  };

  return Marker;

})(GoogleMapsMock);

google.maps.MarkerImage = (function (superClass) {
  extend(MarkerImage, superClass);

  function MarkerImage() {
    return MarkerImage.__super__.constructor.apply(this, arguments);
  }

  return MarkerImage;

})(GoogleMapsMock);

google.maps.Map = (function (superClass) {
  extend(Map, superClass);

  function Map() {
    return Map.__super__.constructor.apply(this, arguments);
  }

  Map.prototype.setCenter = function () {
  };

  Map.prototype.getCenter = function () {
    return new google.maps.LatLng(4, 12);
  };

  Map.prototype.setZoom = function () {
  };

  Map.prototype.getDiv = function () {
  };

  return Map;

})(GoogleMapsMock);

google.maps.Point = (function (superClass) {
  extend(Point, superClass);

  function Point() {
    return Point.__super__.constructor.apply(this, arguments);
  }

  return Point;

})(GoogleMapsMock);

google.maps.Size = (function (superClass) {
  extend(Size, superClass);

  function Size() {
    return Size.__super__.constructor.apply(this, arguments);
  }

  return Size;

})(GoogleMapsMock);

google.maps.InfoWindow = (function (superClass) {
  extend(InfoWindow, superClass);

  function InfoWindow() {
    return InfoWindow.__super__.constructor.apply(this, arguments);
  }

  return InfoWindow;

})(GoogleMapsMock);
