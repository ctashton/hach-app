INSERT INTO 'bookingTable' ('bookingTime', 'bookingEventType', 'bookingNumPeople', 'bookingRecipesOrder', 'bookingLocation', 'bookingSpecialrequests', 'bookingStove', 'bookingGrill', 'bookingOven', 'bookingMicrowave', 'bookingSink')
VALUES ('11:00', 'event1', 6, 'Pastrami', '2531 sunshine avenue', 'none', 'gas Stove', 'gas Grill', TRUE, TRUE, TRUE )

INSERT INTO 'bookingTable' ('bookingTime', 'bookingEventType', 'bookingNumPeople', 'bookingRecipesOrder', 'bookingLocation', 'bookingSpecialrequests', 'bookingStove', 'bookingGrill', 'bookingOven', 'bookingMicrowave', 'bookingSink')
VALUES ('20:00', 'too lazy to cook', 5, 'Lasanga', '6218 Lone star drive', 'Do not use fake cheese', 'Electric', 'none', TRUE, FALSE, TRUE)

-- chefTable -- 
INSERT INTO 'chefTable' ('chefQualifications', 'chefBio', 'chefLocation', 'chefRate', 'chefAvailableBoolean', 'chefFullAvailability', 'chefProfilePictureURL')
VALUES ('noQualifications', 'This is where my chef bio would be, if I could be bothered to write one for these seeds', '1234 address road', 60, TRUE, 'dont know how this is passed from google calandar yet', 'bullshitprofilelink.com')

INSERT INTO 'chefTable' ('chefQualifications', 'chefBio', 'chefLocation', 'chefRate', 'chefAvailableBoolean', 'chefFullAvailability', 'chefProfilePictureURL')
VALUES ('chef certificate', 'I went to chef school, and got a certificate. I am friendly and specialize in cheeses', '2638 thisroadsucks lane', 80, FALSE, 'unknown how this is passed yet', 'professionalheadshots.com/dan')

-- consumerInfoTable --
INSERT INTO 'consumerInfoTable' ('consumerAllergies', 'consumerStove', 'consumerGrill', 'consumerOven'
, 'consumerMicrowave', 'consumerSink')
VALUES ('almonds', 'electric', 'none', TRUE, TRUE, TRUE)

INSERT INTO 'consumerInfoTable' ('consumerAllergies', 'consumerStove', 'consumerGrill', 'consumerOven'
, 'consumerMicrowave', 'consumerSink')
VALUES ('peanuts', 'electric', 'gas', TRUE, TRUE, FALSE)

-- genericUserInfo -- 
INSERT INTO 'genericUserTable' ('userFirstName', 'userLastName', 'userPhone', 'userAddress')
VALUES ('Annie', 'Cherolini', '481-555-8901', '3412 Random Place Drive')

INSERT INTO 'genericUserTable' ('userFirstName', 'userLastName', 'userPhone', 'userAddress')
VALUES ('Chris', 'Baenen', '777-555-1111', '5512 Fake Address Lane')

-- recipeTable --
INSERT INTO 'recipeTable' ('recipeDescription', 'recipeAllergens', 'recipeSiteFavorites')
VALUES ('this is the recipe description', 'peanuts', 'if we do favorites it will be here.')

INSERT INTO 'recipeTable' ('recipeDescription', 'recipeAllergens', 'recipeSiteFavorites')
VALUES ('short recipe description', 'Almonds', 'site favorites here')

-- reviewTable -- 
INSERT INTO 'reviewTable' ('reviewChefContent', 'reviewRecipeContent', 'reviewChef', 'reviewRecipe')
VALUES ('block of text review of a chef', 'block of text review of recipes', 5, 4)

INSERT INTO 'reviewTable' ('reviewChefContent', 'reviewRecipeContent', 'reviewChef', 'reviewRecipe')
VALUES ('asdfoiuasbdfsa', 'sldfiosnadfoiasdn', 3, 1)

-- userTypeTable
INSERT INTO 'userTypeTable' ('userType')
VALUES ('chef')

INSERT INTO 'userTypeTable' ('userType')
VALUES ('consumer')
