
describe('context', function() {

  it('processes the data-formality-context attribute to create nested objects', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="name" value="Bob" />' +
        '<div data-formality-context="address">' +
          '<input type="text" name="country" value="Australia" />' +
	      '<div data-formality-context="city">' +
	          '<input type="text" name="name" value="Sydney" />' +
	          '<input type="text" name="postcode" value="2000" />' +
	        '</div>' +
        '</div>' +
      '</form>'
    );
    
    var country = fixture.formality();
    
    expect(country).toEqual({
    	name: 'Bob',
    	address: {
    	  country: 'Australia',
    	  city: {
    	  	name: 'Sydney',
    	  	postcode: '2000'
    	  }
    	}
    });
  });

  it('understands OGNL-type paths in the context attribute', function() {
    var fixture = $(
      '<form>' +
        '<input type="text" name="name" value="Bob" />' +
	    '<div data-formality-context="address.city">' +
	        '<input type="text" name="name" value="Sydney" />' +
	        '<input type="text" name="postcode" value="2000" />' +
	      '</div>' +
        '</div>' +
      '</form>'
    );

    var country = fixture.formality();

    expect(country).toEqual({
    	name: 'Bob',
    	address: {
    	  city: {
    	  	name: 'Sydney',
    	  	postcode: '2000'
    	  }
    	}
    });
  });

  it('processes nested OGNL contexts in the right order', function() {
    var fixture = $(
      '<form>' +
	    '<div data-formality-context="person.data">' +
          '<input type="text" name="name" value="Bob" />' +
	      '<div data-formality-context="address.city">' +
	          '<input type="text" name="name" value="Sydney" />' +
	          '<input type="text" name="postcode" value="2000" />' +
	        '</div>' +
          '</div>' +
		'</div>' +
      '</form>'
    );

    var country = fixture.formality();

    expect(country).toEqual({
	    person: {
		  data: {
    	    name: 'Bob',
    	    address: {
    	      city: {
    	  	    name: 'Sydney',
    	  	    postcode: '2000'
    	      }
    	    }
	      }
		}
    });
  });       
    
});
