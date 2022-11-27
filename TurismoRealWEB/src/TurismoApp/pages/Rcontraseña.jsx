import React from "react";
export const Rcontraseña = () => {
  return <div> 
  
      <div className="cent">
        <div className="Rcontraseña">
  
            <div className="col-md-4">
        
                    <div className="panel-body">
                      <form id="register-form" role="form" autoComplete="off" className="form" method="post">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                            <input id="email" name="email" placeholder="Ingrese su correo electrónico: " className="form-control" type="email" />
                          </div>
                          <div className="textor">
                        <h4>¿Olvidaste tu contraseña?</h4>
                          </div>
                        </div>
               
                        <div className="botton123">
                          <input name="recover-submit" className="btn btn-lg btn-primary btn-block" defaultValue="Reset Password" type="submit" />
                        </div>
                        <input type="hidden" className="hide" name="token" id="token" defaultValue /> 
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
}

export default Rcontraseña;