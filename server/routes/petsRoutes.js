const router = require('express').Router();

const { Pet, PetImage, User } = require('../db/models');

router.get('/all', async (req, res) => {
  const { userId } = req.session;
  try {
    const allPets = await Pet.findAll({ where: { petUserId: userId } });
    res.json(allPets);
  } catch (error) {
    console.log(error);
  }
});

router.post('/new', async (req, res) => {
  const { userId } = req.session;
  const { petName, petBreed, petType, petGender, petAge, petIsSprayed, petAbout } =
    req.body;
  try {
    const newPet = await Pet.create({
      petName,
      petType,
      petBreed,
      petGender,
      petAge,
      petIsSprayed,
      petAbout,
      petUserId: userId,
    });
    res.json(newPet);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/edit/:id', async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;
  const { petName, petBreed, petType, petGender, petAge, petIsSprayed, petAbout } =
    req.body;
  try {
    const editedPet = await Pet.update(
      {
        petName,
        petBreed,
        petType,
        petGender,
        petAge,
        petIsSprayed,
        petAbout,
      },
      { where: { petUserId: userId, id } }
    );
    res.json(editedPet);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
