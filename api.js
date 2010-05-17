/* API Examples */

/* Two */
var Group = Orm
    .new("Group")
    .int("id").index().primaryKey()
    .string("name");

var PersonGroup = Orm
    .new("PersonGroup")
    .manyToOne("Person", "personId")
    .manyToOne("Group", "groupId");

var Person = Orm
    .new("Person")
    .int("id").index().primaryKey()
    .oneToMany("EmailAddress", "personId")
    .manyToOne("UserType", "userType")
    .manyToMany(PersonGroup)  // option 1
    .manyToMany(Orm.new("PersonGroup").manyToOne("Person", "personId").manyToOne("Group", "groupId")) // option 2
    .manyToMany("Group")  // option 3
    .string("firstName")
    .string("lastName")
    .serializedFields()
        .date("birthDay")
        .string("favoriteBook");

var myPerson = new Person();
myPerson
    .setId(12)
    .setFirstName("Jamon")
    .setLastName("Terrell")
    .setBirthDay(new Date())
    .setFavoriteBook("The Hitchhiker's Guide to the Galaxy")
    .addEmailAddress("someemail@jamonterrell.com")
    .setUserType(UserType.find(4))
    .addGroup(Group.find(6));

/* Example with REST.js */
rest
    .path("/person/{id}")
    .method("POST")
    .as(function(req, resource, obj) {
        Person.find(req.pathParam("id"))
            .getTransaction(function(person) { // transactioned work
                person.setFirstName(obj.firstName);
            }, function(person) {  // success
                resource.ok(person);
            });
    });


/* Multi Object Transaction */

var p = Person.find(1);
var pp = Person.find(2);

Orm.getTransaction([p, pp]), function(p, pp) {
    p.setFirstName("Foo");
    pp.setFirstName("Bar");
}, function(p, pp) {
    // successfully completed updates of both objects
}, function(error, p, pp) {
    // transaction error!
);

/* REST Integration example */
var rest = require('./lib/rest');
var Orm = require('./lib/Orm');
Orm.setRest(rest);
Orm.rest.crud(Person, "/person", {
    "delete": function(or, person) {
        // check permissions or something here
        or.go();
    },
    "create": function(or, person) {
        // check permissions or something here
        if(!Person.search({"firstName": person.getFirstName(), "lastName": person.getLastName()}).empty()) {
            or.invalidRequest("Name already exists");
        } else {
            or.go();
        }
    }
});


/*** DEPRECATED ***/
/* One */
var Person = Orm
    .new("Person")
    .field("id", Orm.INTEGER).index("id").primaryKey("id")
    .field("firstName", Orm.STRING)
    .field("lastName", Orm.STRING)
    .oneToMany("EmailAddress", "personId")
    .field("userType").manyToOne("UserType", "userType")
    .serializedFields({
        "birthDay": Orm.DATE,
        "favoriteBook": Orm.STRING
    });

/* Three */

var Person = Orm.new({
    name: "Person",
    fields: {
        id: Orm.primaryKey(Orm.indexed(Orm.INTEGER))
        firstName: Orm.STRING,
        lastName: Orm.STRING,
    },
    serializedFields: {
        "birthDay": Orm.DATE,
        "favoriteBook": ORM.STRING
    },
    relationships: [
        {type: Orm.ONE_TO_MANY, remoteObject: "EmailAddress", remoteField: "personId"},
        {type: Orm.MANY_TO_ONE, remoteObject: "UserType", remoteField: "userType"}
    ]
});
