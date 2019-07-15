#!/bin/bash 

#VARIABLES QUE VAMOS A NECESITAR

primeraParteRuta="https://awstats.ledevserver.indra.es/jenkins/"
nombreProyecto=iVictrix_AutoTest_Diaria
lastSuccessfulBuild="/lastSuccessfulBuild"
lastStableBuild="/lastStableBuild"
lastUnstableBuild="/lastUnstableBuild"
lastUnsuccessfulBuild="/lastUnsuccessfulBuild"
lastFailedBuild="/lastFailedBuild"
finalRuta="/archive/target/cucumber.json"
url=""
insertar=false

su -c "psql -A -t -d tareas -c \" select fecha from consulta \"" postgres > fechas
su -c "psql -A -t -d tareas -c \" select nombre from proyectos \"" postgres > proyectos
su -c "psql -A -t -d tareas -c \" select nombre from proyectos where seguimiento=true \"" postgres > proyectosSeguidos

function obtenerJson {

	url=""
	echo $1
	#Intentamos obtener la ultima ejecucion exitosa
	wget -e use_proxy=on -e http_proxy=proxy.indra.es:8080 --no-check-certificate -o logfile $primeraParteRuta$1"_AutoTest_Diaria"$lastSuccessfulBuild$finalRuta
	#Comprobamos que no ha ocurrido ningun error
	grep -r -i "error" logfile > error

	insertar=false

	if [ -s error ]
	then
		echo "Algo ha ido mal con lastSuccessfulBuild"
		wget -e use_proxy=on -e http_proxy=proxy.indra.es:8080 --no-check-certificate -o logfile $primeraParteRuta$1$lastStableBuild$finalRuta
		grep -r -i "error" logfile > error

		if [ -s error ]
		then
			echo "Algo ha ido mal con lastStableBuild"
			wget -e use_proxy=on -e http_proxy=proxy.indra.es:8080 --no-check-certificate -o logfile $primeraParteRuta$1$lastUnstableBuild$finalRuta
			grep -r -i "error" logfile > error

			if [ -s error ]
			then
				echo "Algo ha ido mal con lastUnstableBuild"
				wget -e use_proxy=on -e http_proxy=proxy.indra.es:8080 --no-check-certificate -o logfile $primeraParteRuta$1$lastUnsuccessfulBuild$finalRuta
				grep -r -i "error" logfile > error

				if [ -s error ]
				then
					echo "Algo ha ido mal con lastUnsuccessfulBuild"
					wget -e use_proxy=on -e http_proxy=proxy.indra.es:8080 --no-check-certificate -o logfile $primeraParteRuta$1$lastFailedBuild$finalRuta
					grep -r -i "error" logfile > error

					if [ -s error ]
					then
						echo "Algo ha ido mal con lastFailedBuild"
					else
						echo "Todo ha ido bien, se ha usado lastFailedBuild"
						url="$primeraParteRuta$nombreProyecto$lastFailedBuild$finalRuta"
						insertar=true
					fi
				else
					echo "Todo ha ido bien, se ha usado lastUnsuccessfulBuild"
					url="$primeraParteRuta$nombreProyecto$lastUnsuccessfulBuild$finalRuta"
					insertar=true
				fi
			else
				echo "Todo ha ido bien, se ha usado lastUnstableBuild"
				url="$primeraParteRuta$nombreProyecto$lastUnstableBuild$finalRuta"
				insertar=true
			fi
		else
			echo "Todo ha ido bien, se ha usado lastStableBuild"
			url="$primeraParteRuta$nombreProyecto$lastStableBuild$finalRuta"
			insertar=true
		fi
	else
		echo "Todo ha ido bien, se ha usado lastSuccessfulBuild"
		url="$primeraParteRuta$nombreProyecto$lastSuccessfulBuild$finalRuta"
		insertar=true
	fi

	echo $url          
	                                                    
	#Eliminar la parte del nombre del proyecto que no nos interesa
	nombreProyectoBBDD=$1
	echo $nombreProyectoBBDD
	#Buscamos en la base de datos el identificador correspondiente al nombre del proyecto obtenido
	identificadorBBDD=$(echo $(su -c "psql -A -t -d tareas -c \" select identificador from proyectos where nombre='$nombreProyectoBBDD'\"" postgres))
	echo $identificadorBBDD

	#su -c "psql -A -t -d tareas -c \" insert into consulta (url, identificador, fecha, artefacto) values ('$primeraParteRuta$nombreProyectoBBDD$lastSuccessfulBuild$finalRuta', 1001)\"" postgres

echo $insertar

if [ $insertar == true ]
then
	#Obtenemos la fecha actual y tomamos el formato que necesitamos para la base de datos
	diaBBDD=$(echo $(date +"%Y-%m-%d %T"))
	echo $diaBBDD

	VAR=$(cat cucumber.json)

	#Hacemos la insercion de los datos de la ejecucion en la BBDD
	psql postgresql://marco:marco@localhost:5432/tareas << EOF

	insert into consulta (url, identificador, fecha, artefacto) values ('$url', $identificadorBBDD, '$diaBBDD', '$VAR');

EOF

	mv cucumber.json $1/cucumber_`date +"%Y-%m-%d"`.json
fi
}




while read linea ; do
	
	sinespacios=$(echo "$linea" | tr -d '[[:space:]]')

		echo "-*-*-*-*-*-*-*-*-*"
		echo $sinespacios

		obtenerJson  $sinespacios
		
		
	
done <<< "`cat proyectosSeguidos`"






#su -c "psql -A -t -d tareas -c \"insert into consulta (url, identificador, fecha, artefacto) values ('UNKNOWN', $identificadorBBDD, '$diaBBDD', :'$VAR'::json)\"" postgres 

#su -c "psql -A -t -d tareas -c \" insert into proyectos (nombre, identificador) values ('iVictrix', 1001)\"" postgres

#su -c "psql -A -t -d tareas -c \" \set content `cat cucumber.json` create temp table t ( j json); insert into t values(:'content');\"" postgres

#su -c "psql -d tareas -c \" update consulta set id=17 where id=$varid\"" postgres

#su -c "psql -d tareas -c \" update consulta set fecha='$dia1' where id=17\"" postgres

#su -c "psql -d tareas -c \" delete from consulta where id=17 \"" postgres
