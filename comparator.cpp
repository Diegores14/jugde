#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, s2;
    getline(cin, s);
    getline(cin, s2);
    cout << s << '\n';
    ifstream File1(s2, ios::in), File2(s, ios::in);
    while(!File2.eof() && !File1.eof()) {
        char c1 = File2.get(), c2 = File1.get();
        if(File1.eof()) break;
        cout << "salida:" << c1 << ' ' << "salida:" << c2 << '\n';
        if( c1 != c2 ) {
            //cout << c1 << ' ' << c2 << '\n';
            File1.close();
            File2.close();
            cout << "Wrong Answer f";
            return 0;
        }
    }
    if(File1.eof()) {
        cout << "Accepted";
    } else {
        cout << "Wrong Answer";
    }
    File1.close();
    File2.close();
    return 0;
}