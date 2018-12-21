package com.opengiftonlinetaxi;

import com.facebook.react.ReactActivity;
import org.pweitz.reactnative.locationswitch.LocationSwitch;

import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        LocationSwitch.getInstance().onActivityResult(requestCode, resultCode);
    }

    @Override
    protected String getMainComponentName() {
        return "OpenGiftOnlineTaxi";
    }
}
