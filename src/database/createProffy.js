module.exports = async function(data, {proffyValue, classValue, classScheduleValues}){
    const insertedProffy = await data.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
            
        );
    `)

    const proffy_id = insertedProffy.lastID;

    const insertedClass = await data.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    const insertedClassScheduleValues = classScheduleValues.map((value)=>{
        return data.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"

            );
        `)
    })
    
    await Promise.all(insertedClassScheduleValues);

}