import React, {FormEvent} from 'react';
import {render} from 'react-dom';
  


class AWS_cloud {
    private username : string
    private password : string

    public set_username(_name : string) : void {
        this.username = _name;
    }

    public set_password(_pass : string) : void {
        this.password = _pass;
    }
}