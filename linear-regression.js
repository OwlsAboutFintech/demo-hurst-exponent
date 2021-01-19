function regression(data) {
    var sum_x = 0,
        sum_y = 0,
        sum_xy = 0,
        sum_xx = 0,
        count = 0,
        m, b;

    if (data.length === 0) {
        throw new Error('Empty data');
    }

    for (var i_data = 0; i_data < data.length; i_data++) {
        sum_x += data[i_data].x;
        sum_y += data[i_data].y;
        sum_xx += data[i_data].x * data[i_data].x;
        sum_xy += data[i_data].x * data[i_data].y;
        count++;
    }

    m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    b = (sum_y / count) - (m * sum_x) / count;

    var yh_h = new Array;
    var yh_h100 = new Array;
    var yh_h50 = new Array;
    var yh_h0 = new Array;
    for (var i_array = 0; i_array < data.length; i_array++) {
        // console.log({ x: data[i_array].x, y: m * data[i_array].x + b });
        yh_h.push({ x: data[i_array].x, y: m * data[i_array].x + b });
        yh_h100.push({ x: data[i_array].x, y: 1.00 * data[i_array].x + b });
        yh_h50.push({ x: data[i_array].x, y: 0.50 * data[i_array].x + b });
        yh_h0.push({ x: data[i_array].x, y: 0.00 * data[i_array].x + b });
    }

    var yh = {h: yh_h, h100: yh_h100, h50: yh_h50, h0: yh_h0, m: m};
    return yh;
}