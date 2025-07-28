#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <cmath>
#include <algorithm>
using namespace std;


long long decodeBase(string value, int base) {
    long long result = 0;
    for (char c : value) {
        int digit;
        if (isdigit(c)) digit = c - '0';
        else digit = tolower(c) - 'a' + 10;
        result = result * base + digit;
    }
    return result;
}


long long lagrangeAtZero(vector<int> x, vector<long long> y) {
    long double result = 0.0;
    int k = x.size();

    for (int i = 0; i < k; ++i) {
        long double term = (long double)y[i];
        for (int j = 0; j < k; ++j) {
            if (i == j) continue;
            term *= (0.0 - x[j]) / (x[i] - x[j]);
        }
        result += term;
    }

    return round(result);
}


void generateCombinations(vector<int> &keys, int k, vector<vector<int>> &combs) {
    int n = keys.size();
    vector<bool> mask(k, true);
    mask.resize(n, false);
    do {
        vector<int> comb;
        for (int i = 0; i < n; ++i)
            if (mask[i]) comb.push_back(keys[i]);
        combs.push_back(comb);
    } while (prev_permutation(mask.begin(), mask.end()));
}


long long findSecret(string filename) {
    ifstream file(filename.c_str());
    int n, k;
    file >> ws;

    string temp;
    file >> temp >> n;
    file >> temp >> k;

    map<int, long long> points;

    int key, base;
    string val;
    while (file >> key >> base >> val) {
        long long decoded = decodeBase(val, base);
        points[key] = decoded;
    }

    vector<int> x_keys;
    for (auto it : points) x_keys.push_back(it.first);

    vector<vector<int>> combs;
    generateCombinations(x_keys, k, combs);

    map<long long, int> freq;
    for (auto comb : combs) {
        vector<long long> y_vals;
        for (int x : comb) y_vals.push_back(points[x]);
        long long secret = lagrangeAtZero(comb, y_vals);
        freq[secret]++;
    }

    
    long long finalSecret = -1;
    int maxFreq = -1;
    for (auto it : freq) {
        if (it.second > maxFreq) {
            maxFreq = it.second;
            finalSecret = it.first;
        }
    }

    return finalSecret;
}

int main() {
    cout << "Secret for input1.txt: " << findSecret("input1.txt") << endl;
    cout << "Secret for input2.txt: " << findSecret("input2.txt") << endl;
    return 0;
}
