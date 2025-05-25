const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../models');

const seedData = async () => {
  try {
    // Sync database (WARNING: this drops and recreates all tables)
    await db.sequelize.sync({ force: true });
    console.log('🗃️ Database synced.');

    const compounds = [];

    const filePath = path.resolve("C:\\Users\\Lenovo\\Desktop\\compound (1).csv");

    if (!fs.existsSync(filePath)) {
      console.error('❌ CSV file not found at path:', filePath);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Use the exact CSV column names here:
        const compound = {
          name: row.CompoundName?.trim(),
          image: row.strImageSource?.trim(), // or strImageAttribution if you want that
          description: row.CompounrDescription?.trim() // note typo in header: "CompounrDescription"
        };

        if (compound.name && compound.image && compound.description) {
          compounds.push(compound);
        }
      })
      .on('end', async () => {
        try {
          await db.compound.bulkCreate(compounds);
          console.log(`✅ Seeded ${compounds.length} compounds successfully.`);
          process.exit();
        } catch (error) {
          console.error('❌ Error while inserting data:', error);
          process.exit(1);
        }
      })
      .on('error', (err) => {
        console.error('❌ Error reading the CSV file:', err);
        process.exit(1);
      });
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
