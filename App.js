Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'},

    launch: function() {
        //Write app code here
        console.log("launch");

        var ctx = this.getContext();

        console.log("ctx",ctx);

        var user = ctx.getUser();

        console.log("user",user);

        var imageUrl = Rally.util.User.getProfileImageUrl(50,user._ref);

        console.log(user._ref, imageUrl);

        var extImage = Ext.create( 'Ext.Img', {
        	src : imageUrl
        });

        this.add(extImage);

         // this.add( Ext.create('Ext.Img', {
         //    src: Rally.util.User.getProfileImageUrl(50,user._ref),
         //    shrinkWrap:true,
         //    border:false}));

		var project = ctx.getProject();

		console.log("project",project);

		Ext.create('Rally.data.WsapiDataStore', {
	        autoLoad : true,
	        limit : "Infinity",
	        model : "Project", 
	        fetch : ["Name","TeamMembers"],
	        filters : [
	        	{ property : "ObjectID", operator : "=", value: project.ObjectID }
	       	],
	        listeners : {
	            
	            scope : this,
	            
	            load : function(store, data) {

	                console.log("data",data);
	                if (data.length>0)
	                	this.readTeamMembers( data[0]);
	            }

	        }
        });

    },

    readTeamMembers : function( team ) {

    	var that = this;

    	team.getCollection("TeamMembers").load(
    	{
            fetch : ['UserName','DisplayName'],
            callback : function(records,operation,success) {
            	console.log("success:",success);
                console.log("team members",records);
                _.each( records, function( teamMember ) {
                	console.log("Member:",teamMember.get("DisplayName"));

                	var imageUrl = Rally.util.User.getProfileImageUrl( 25, teamMember.get("_ref"));
			        var extImage = Ext.create( 'Ext.Img', {
			        	src : imageUrl
			        });

			        that.add(extImage);

                });
            }
        });

    }

});
