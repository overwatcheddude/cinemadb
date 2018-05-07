package com.example.overw.tauseefmobileapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Web view code
        WebView WebView = findViewById(R.id.WebView);
        WebView.setWebViewClient(new WebViewClient());
        WebView.getSettings().setJavaScriptEnabled(true);
        WebView.loadUrl("http://cinemadb.eu-4.evennode.com/static/");
    }
}