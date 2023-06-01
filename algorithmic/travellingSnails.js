function travellingSnails(snailNumber, heights, daySpeed, nightSpeed) {
    if (heights.length !== snailNumber || daySpeed.length !== snailNumber || nightSpeed.length !== snailNumber) {
        throw new Error('Arrays are not at the good length');
    }

    let arrival = [];

    while (!allSnailsArrived(snailNumber, heights)) {
        heights = addOneDay(snailNumber, heights, daySpeed);
        arrival = addArrivalSnailToArrival(snailNumber, heights, arrival);
        heights = addOneNight(snailNumber, heights, nightSpeed);
    }

    return arrival;
}


function allSnailsArrived(snailNumber, heights) {
    for (let i = 0; i < snailNumber; i++) {
        if (!isSnailArrived(heights[i])) {
            return false;
        }
    }

    return true;
}

function addOneDay(snailNumber, heights, daySpeed) {
    for (let i = 0; i < snailNumber; i++) {
        if (!isSnailArrived(heights[i])) {
            heights[i] -= daySpeed[i]
        }
    }

    return heights;
}

function addOneNight(snailNumber, heights, nightSpeed) {
    for (let i = 0; i < snailNumber; i++) {
        if (!isSnailArrived(heights[i])) {
            heights[i] += nightSpeed[i];
        }
    }

    return heights;
}

function addArrivalSnailToArrival(snailNumber, heights, arrival) {
    for (let i = 0; i < snailNumber; i++) {
        if (isSnailArrived(heights[i]) && !arrival.includes(i+1)) {
            arrival.push(i+1);
        }
    }

    return arrival;
}

function isSnailArrived(snailHeight) {
    return snailHeight <= 0;
}

// To run test, you just have to call the function travellingSnails like :
// travellingSnails(7, [10,5,8,3,25,7,9], [2,3,2,4,5,3,2], [1,2,1,3,1,2,0]);