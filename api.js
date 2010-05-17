/* API Examples */

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
