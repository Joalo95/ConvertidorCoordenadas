import React from "react";
import background from "./worldmap.jpg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import whatsapp from "./whatsapp.svg";
import twitter from "./twitter.svg";
import linkedin from "./linkedin.svg";
import share from "./share.svg";
import arrowDown from "./arrow-down.svg";
import arrowUp from "./arrow-up.svg";
import "./App.css";

function CoordinateParser(props) {

    var signlat = 1;
    var signlon = 1;
    var latAbs = 0;
    var lonAbs = 0;
    var deglat = "";
    var deglon = "";

    var latsign = 1;
    var lonsign = 1;
    var absdlat = 0;
    var absdlon = 0;
    var absmlat = 0;
    var absmlon = 0;
    var absslat = 0;
    var absslon = 0;

    function cmdLat2UTM_click() {
        var xy = new Array(2);
        if (isNaN(parseFloat(document.frmConverter.txtLon.value))) {
            alert("Por favor ingrese una longitud valida.");
            return false;
        }

        var lon = parseFloat(document.frmConverter.txtLon.value);

        if ((lon < -180.0) || (180.0 <= lon)) {
            alert("La longitud ingresada esta fuera de rango.  " +
                "Por favor ingrese un valor comprendido entre [-180, 180).");
            return false;
        }

        if (isNaN(parseFloat(document.frmConverter.txtLat.value))) {
            alert("Por favor ingrese una latitud valida.");
            return false;
        }

        var lat = parseFloat(document.frmConverter.txtLat.value);

        if ((lat < -90.0) || (90.0 < lat)) {
            alert("La latitud ingresada esta fuera de rango.  " +
                "Por favor ingrese un valor comprendido entre [-90, 90].");
            return false;
        }

        // Compute the UTM zone.
        var zone = Math.floor((lon + 180.0) / 6) + 1

        zone = props.LatLonToUTMXY(props.DegToRad(lat), props.DegToRad(lon), zone, xy);

        /* Set the output controls.  */
        document.frmConverter.txtX.value = xy[0];
        document.frmConverter.txtY.value = xy[1];
        document.frmConverter.txtZone.value = zone;
        if (lat < 0) {
            // Set the S button.
            document.frmConverter.rbtnHemisphere[1].checked = true;
        }
        else {
            // Set the N button.
            document.frmConverter.rbtnHemisphere[0].checked = true;
        }
        return true;
    }

    function cmdUTM2Lat_click() {

        var latlon = new Array(2);
        var x, y, zone, southhemi;

        if (isNaN(parseFloat(document.frmConverter.txtX.value))) {
            alert("Por favor ingrese un valor valido para X.");
            return false;
        }

        x = parseFloat(document.frmConverter.txtX.value);

        if (isNaN(parseFloat(document.frmConverter.txtY.value))) {
            alert("Por favor ingrese un valor valido para Y.");
            return false;
        }

        y = parseFloat(document.frmConverter.txtY.value);

        if (isNaN(parseInt(document.frmConverter.txtZone.value))) {
            alert("Por favor ingrese una zona valida de UTM.");
            return false;
        }

        zone = parseFloat(document.frmConverter.txtZone.value);

        if ((zone < 1) || (60 < zone)) {
            alert("El valor de zona de UTM esta fuera de rango.  " +
                "Por favor ingrese un valor entre [1, 60].");
            return false;
        }

        if (document.frmConverter.rbtnHemisphere[1].checked == true) {
            southhemi = true;
        }
        else {
            southhemi = false;
        }
        props.UTMXYToLatLon(x, y, zone, southhemi, latlon);

        document.frmConverter.txtLon.value = props.RadToDeg(latlon[1]);
        document.frmConverter.txtLat.value = props.RadToDeg(latlon[0]);

        return true;

    }

    function inputDlat() {

        if (document.form10.dlat.value < 0) {
            latsign = -1;
            absdlat = Math.abs(Math.round(document.form10.dlat.value * 1000000.));
        }
        //Math.round is used to eliminate the small error caused by rounding in the computer:
        //e.g. 0.2 is not the same as 0.20000000000284

        //Error checks
        if (absdlat > (90 * 1000000)) {
            alert(' Degrees Latitude must be in the range of -90 to 90. ');
            document.form10.dlat.value = '';
            document.form10.dlat.value = '';
            document.form10.mlat.value = '';
        }
    }

    function inputMlat() {
        document.form10.mlat.value = Math.abs(Math.round(document.form10.mlat.value * 1000000.) / 1000000);  //integer
        absmlat = Math.abs(Math.round(document.form10.mlat.value * 1000000.));  //integer

        //Error checks
        if (absmlat >= (60 * 1000000)) {
            alert(' Minutes Latitude must be in the range of 0 to 59. ');
            document.form10.mlat.value = '';
            document.form10.slat.value = '';
        }
    }

    function inputSlat() {
        document.form10.slat.value = Math.abs(Math.round(document.form10.slat.value * 1000000.) / 1000000);
        absslat = Math.abs(Math.round(document.form10.slat.value * 1000000.));// Note: kept as big integer for now, even if submitted as decimal

        //Error checks
        if (absslat > (59.99999999 * 1000000)) {
            alert(' Minutes Latitude must be 0 or greater \n and less than 60. ');
            document.form10.slat.value = '';
        }
    }

    function inputDlon() {
        if (document.form10.dlon.value < 0) {
            lonsign = -1;
            absdlon = Math.abs(Math.round(document.form10.dlon.value * 1000000.));
        }
        //Math.round is used to eliminate the small error caused by rounding in the computer:
        //e.g. 0.2 is not the same as 0.20000000000284

        //Error checks
        if (absdlon > (180 * 1000000)) {
            alert(' Degrees Longitude must be in the range of -180 to 180. ');
            document.form10.dlon.value = '';
            document.form10.mlon.value = '';
        }
    }

    function inputMlon() {
        document.form10.mlon.value = Math.abs(Math.round(document.form10.mlon.value * 1000000.) / 1000000);  //integer
        absmlon = Math.abs(Math.round(document.form10.mlon.value * 1000000));  //integer
        //Error checks
        if (absmlon >= (60 * 1000000)) {
            alert(' Minutes Longitude must be in the range of 0 to 59. ');
            document.form10.mlon.value = '';
            document.form10.slon.value = '';
        }
    }

    function inputSlon() {
        document.form10.slon.value = Math.abs(Math.round(document.form10.slon.value * 1000000.) / 1000000);
        absslon = Math.abs(Math.round(document.form10.slon.value * 1000000.));// Note: kept as big integer for now, even if submitted as decimal

        //Error checks
        if (absslon > (59.99999999 * 1000000)) {
            alert(' Minutes Latitude must be 0 or greater \n and less than 60. ');
            document.form10.slon.value = '';
        }
    }

    function submitToDecimal() {
        document.form10.alat.value = Math.round(absdlat + (absmlat / 60.) + (absslat / 3600.)) * latsign / 1000000;
        document.form10.alon.value = Math.round(absdlon + (absmlon / 60) + (absslon / 3600)) * lonsign / 1000000;
        latsign = 1;
        lonsign = 1;
    }

    function resetToDecimal() {
        document.form10.reset();
        absdlat = 0;
        absdlon = 0;
        absmlat = 0;
        absmlon = 0;
        absslat = 0;
        absslon = 0;
        document.form10.alat.value = 0;
        document.form10.alon.value = 0;
    }

    function inputLatDecimal() {
        if (document.form11.latDecimal.value < 0) {
            signlat = -1;
            latAbs = Math.abs(Math.round(document.form11.latDecimal.value * 1000000.));
        }

        //Math.round is used to eliminate the small error caused by rounding in the computer:
        //e.g. 0.2 is not the same as 0.20000000000284

        //Error checks
        if (latAbs > (90 * 1000000)) {
            alert(' Degrees Latitude must be in the range of -90. to 90. ');
            document.form11.latDecimal.value = '';
            latAbs = 0;
        }
    }

    function inputLonDecimal() {
        if (document.form11.lonDecimal.value < 0) {
            signlon = -1;
            lonAbs = Math.abs(Math.round(document.form11.lonDecimal.value * 1000000.));
        }

        //Math.round is used to eliminate the small error caused by rounding in the computer:
        //e.g. 0.2 is not the same as 0.20000000000284

        //Error checks
        if (lonAbs > (180 * 1000000)) {
            alert(' Degrees Longitude must be in the range of -180 to 180. ');
            document.form11.lonDecimal.value = '';
            lonAbs = 0;
        }
    }

    function submitToGeo() {
        document.form11.deglat.value = ((Math.floor(latAbs / 1000000) * signlat) + '° ' + Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) + '\' ' + (Math.floor(((((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) - Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60)) * 100000) * 60 / 100000) + '" ');
        document.form11.deglon.value = ((Math.floor(lonAbs / 1000000) * signlon) + '° ' + Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) + '\' ' + (Math.floor(((((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) - Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60)) * 100000) * 60 / 100000) + '" ');
        signlat = 1;
        signlon = 1;
    }

    function resetToGeo() {
        document.form11.reset();
        latAbs = 0;
        lonAbs = 0;
        document.form11.deglat.value = 0;
        document.form11.deglon.value = 0;
    }

    const latitudes = [];
    const longitudes = [];


    return (
        <div className="App">
            <img src={background} alt="" />
            <div className="header">
                <h1>Conversor de coordenadas geográficas</h1>
            </div>
            <div className="container">
                <div className="form form1">

                    <h3>De grados, minutos y segundos a grados en decimal</h3>

                    <form method="POST" name="form10" enctype="application/x-www-form-urlencoded ">

                        <div>Insertar la latitud en grados, minutos y segundos:</div>
                        <div>
                            <input name="dlat" type="INT" maxlength="6" id="DMSlat" onBlur={inputDlat} />
                            <label>°</label>
                            <input name="mlat" type="INT" maxlength="6" id="DMSlat" onBlur={inputMlat} />
                            <label>'</label>
                            <input name="slat" type="INT" maxlength="6" id="DMSlat" onBlur={inputSlat} />
                            <label>"</label>
                        </div>

                        <div>Insertar la longitud en grados, minutos y segundos:</div>
                        <div>
                            <input name="dlon" type="INT" maxlength="6" id="DMSlon" onBlur={inputDlon} />
                            <label>°</label>
                            <input name="mlon" type="INT" maxlength="6" id="DMSlon" onBlur={inputMlon} />
                            <label>'</label>
                            <input name="slon" type="INT" maxlength="6" id="DMSlon" onBlur={inputSlon} />
                            <label>"</label>
                        </div>

                        <div>

                            <input name="submitToDecimal" type="button" value="Convertir a Decimal" onClick={submitToDecimal} />
                            <input name="resetToDecimal" type="button" value="Eliminar valores" onClick={resetToDecimal} />
                        </div>

                        <div>
                            <div>Resultados:</div>
                            <div>
                                <div>Latitud:</div>
                                <input name="alat" type="INT" value="" maxlength="17" id="alat" />

                                <div>Longitud:</div>
                                <input name="alon" type="INT" value="" maxlength="17" id="alon" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="form form2">
                    <h3>De grados en decimal a grados, minutos y segundos</h3>

                    <form method="POST" name="form11" enctype="application/x-www-form-urlencoded ">

                        <div>Insertar la latitud en decimal:</div>

                        <div>
                            <input name="latDecimal" type="INT" maxlength="10" id="DegreesLat" onBlur={inputLatDecimal} />
                        </div>

                        <div>Insertar la longitud en decimal:</div>

                        <div>
                            <input name="lonDecimal" type="INT" maxlength="11" id="DegreesLon" onBlur={inputLonDecimal} />
                        </div>

                        <div>
                            <input name="submitToGeo" type="button" value="Convertir a Sexagesimal" onClick={submitToGeo} />
                            <input name="resetToGeo" type="button" value="Eliminar valores" tabindex="14" onClick={resetToGeo} />
                        </div>


                        <div>Resultados:</div>
                        <div>Latitud:</div>
                        <input name="deglat" type="text" value="" maxlength="17" id="deglat" />
                        <div>Longitud:</div>
                        <input name="deglon" type="text" value="" maxlength="19" id="deglon" />


                    </form>
                </div>
                <form className="form form3" name="frmConverter">

                    <h3>Conversor de coordenadas decimales a UTM</h3>

                    <div>
                        <p>Las coordenadas geográficas deben ser
                            ingresadas y serán mostradas en grados decimales. Los números negativos
                            indican longitudes de Oeste y latitudes de Sur. Las coordenadas UTM
                            deben ser ingresadas y serán mostradas en metros. El modelo de elipsoide
                            utilizado es el WGS84.</p>
                    </div>

                    <div>

                        <div>
                            <h2>Coordenadas en grados decimales</h2>
                            <div>
                                <div>Longitud:</div>
                                <div><input name="txtLon" type="text" id="txtLon4" /></div>
                            </div>
                            <div>
                                <div>Latitud:</div>
                                <div><input name="txtLat" type="text" id="txtLat4" /></div>
                            </div>
                        </div>

                        <div>
                            <button className="btn-arrow" onClick={cmdLat2UTM_click} ><img src={arrowDown} /></button>
                            <button className="btn-arrow" onClick={cmdUTM2Lat_click} ><img src={arrowUp} /></button>
                        </div>

                        <div>
                            <h2>UTM</h2>
                            <div>
                                <div>
                                    <div>X:</div>
                                    <div><input name="txtX" type="text" id="txtX3" /></div>
                                </div>
                                <div>
                                    <div>Y:</div>
                                    <div><input name="txtY" type="text" id="txtY3" /></div>
                                </div>
                                <div>
                                    <div>Zona:</div>
                                    <div><input name="txtZone" type="text" id="txtZone3" /></div>
                                </div>
                                <div>
                                    <div>
                                        Hemisferio:
                                    </div>
                                    <div className="section-horizontal">
                                        <input onclick={0} type='radio' value='N' name='rbtnHemisphere' />Norte
                                        <input onclick={0} type='radio' value='S' name='rbtnHemisphere' />Sur
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <footer>
                <div><h3>2023 &copy;</h3></div>
                <div><h3>Joaquin Alonso &#128526;</h3></div>
                <div>
                    <button className="button">
                        <span className="button-text">
                            <span>Comparte este recurso</span>
                            <img src={share} alt="" />
                        </span>
                        <span className="button-links">
                            <a href="https://twitter.com/intent/tweet?text=conversor%20de%20coordenadas&url=http://joalo95.github.io/ConvertidorCoordenadas&hashtags=webdesign">
                                <img src={twitter} alt="" />
                            </a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=http://joalo95.github.io/ConvertidorCoordenadas">
                                <img src={facebook} alt="" />
                            </a>
                            <a href="https://www.instagram.com/sharer/sharer.php?u=http://joalo95.github.io/ConvertidorCoordenadas">
                                <img src={instagram} alt="" />
                            </a>
                            <a href="https://api.whatsapp.com/send?text=conversor%20de%20coordenadas&url=http://joalo95.github.io/ConvertidorCoordenadas">
                                <img src={whatsapp} alt="" />
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=http://joalo95.github.io/ConvertidorCoordenadas">
                                <img src={linkedin} alt="" />
                            </a>
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default CoordinateParser