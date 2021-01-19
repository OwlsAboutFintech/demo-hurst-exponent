function calculateMean(data, len) {
    var mean = new Array;
    for (i_data = 0; i_data <= data.length - len; i_data = i_data + len) {
        var interval_data = data.slice(i_data, i_data + len);
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            mean.push(interval_data.reduce(function(a, b) { return a + b; }, 0) / len);
        }
    }
    return mean;
}

function calculateStdDev(data, len) {
    var mean = calculateMean(data, len);
    var stddev = new Array;
    for (i_data = 0; i_data <= data.length - len; i_data = i_data + len) {
        var interval_data = data.slice(i_data, i_data + len);
        var res_sum_sqr = 0;
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            res_sum_sqr += math.square(interval_data[i_interval_data] - mean[i_data]);
        }
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            stddev.push(math.sqrt(res_sum_sqr / len));
        }
    }
    return stddev;
}

function calculateCumDev(data, len) {
    var mean = calculateMean(data, len);
    var cum_dev = new Array;
    for (i_data = 0; i_data <= data.length - len; i_data = i_data + len) {
        var interval_data = data.slice(i_data, i_data + len);
        var res_sum = 0;
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            res_sum += (interval_data[i_interval_data] - mean[i_data]);
            cum_dev.push(res_sum);
        }
    }
    return cum_dev;
}

function calculateRange(data, len) {
    var cum_dev = calculateCumDev(data, len);
    var range = new Array;

    for (i_data = 0; i_data <= cum_dev.length - len; i_data = i_data + len) {
        var cum_dev_max = cum_dev[i_data];
        var cum_dev_min = cum_dev[i_data];
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            if (cum_dev_max < cum_dev[i_data + i_interval_data]) {
                cum_dev_max = cum_dev[i_data + i_interval_data];
            }
            if (cum_dev_min > cum_dev[i_data + i_interval_data]) {
                cum_dev_min = cum_dev[i_data + i_interval_data];
            }
        }
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {

        }
        for (i_interval_data = 0; i_interval_data < len; i_interval_data++) {
            range.push(cum_dev_max - cum_dev_min);
        }
    }
    return range;
}

function calculateRescaledRange(data, len) {
    var range = calculateRange(data, len);
    var stddev = calculateStdDev(data, len);
    var rescaled_range = new Array;
    for (i_data = 0; i_data < data.length; i_data++) {
        rescaled_range.push(range[i_data] / stddev[i_data]);
    }
    return rescaled_range;
}

function calculateRSAverage(data, len) {
    var rs = calculateRescaledRange(data, len);
    var rs_sum = 0.0;
    var cnt = 0;
    for (i_data = 0; i_data <= data.length - len; i_data = i_data + len) {
        rs_sum += rs[i_data];
        cnt++;
    }
    if (cnt > 0) {
        return (rs_sum + 0.0) / (cnt + 0.0);
    }
    return 0;
}

function calculateRSBasedLog2(data) {
    var rs_array = new Array;
    for (var i_array = 2; i_array < data.length; i_array *= 2) {
        rs_array.push(calculateRSAverage(data, i_array));
    }
    return rs_array;
}

function getRnSnX(data) {
    var x_array = new Array;
    for (var i_array = 0; i_array < data.length; i_array++) {
        x_array.push(i_array);
    }
    return x_array;
}

function getRnSnY(data) {
    var y_array = new Array;
    y_array.push(math.log(1, 2));
    for (var i_array = 1; i_array < data.length; i_array++) {
        y_array.push(math.log(data[i_array], 2));
    }
    return y_array;
}

function getRnSnData(RnSn_data) {
    var xx = getRnSnX(RnSn_data);
    var yy = getRnSnY(RnSn_data);
    var xy_array = new Array;
    for (var i_array = 0; i_array < xx.length; i_array++) {
        xy_array.push({ x: xx[i_array], y: yy[i_array] });
    }
    return xy_array;
}