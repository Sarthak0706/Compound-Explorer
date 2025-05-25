const db = require('../models');

exports.getAllCompounds = async (req, res) => {
  try {
    const compounds = await db.compound.findAll();
    res.json(compounds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch compounds.' });
  }
};

exports.getCompoundById = async (req, res) => {
  try {
    const compound = await db.compound.findByPk(req.params.id);
    if (compound) {
      res.json(compound);
    } else {
      res.status(404).json({ error: 'Compound not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch compound.' });
  }
};

exports.createCompound = async (req, res) => {
  try {
    const newCompound = await db.compound.create(req.body);
    res.status(201).json(newCompound);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create compound.' });
  }
};

exports.updateCompound = async (req, res) => {
  try {
    const compound = await db.compound.findByPk(req.params.id);
    if (compound) {
      await compound.update(req.body);
      res.json(compound);
    } else {
      res.status(404).json({ error: 'Compound not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update compound.' });
  }
};

exports.deleteCompound = async (req, res) => {
  try {
    const compound = await db.compound.findByPk(req.params.id);
    if (compound) {
      await compound.destroy();
      res.json({ message: 'Compound deleted.' });
    } else {
      res.status(404).json({ error: 'Compound not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete compound.' });
  }
};
