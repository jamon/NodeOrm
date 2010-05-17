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
var Person = Orm
    .new("Person")
    .int("id").index().primaryKey()
    .oneToMany("EmailAddress", "personId")
    .manyToOne("UserType", "userType")
    .string("firstName")
    .string("lastName")
    .serializedFields()
        .date("birthDay")
        .string("favoriteBook");

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
